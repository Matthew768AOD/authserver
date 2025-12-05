using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PeslickAuthorityServer.Data;
using PeslickAuthorityServer.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PeslickAuthorityServer.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthenticationOptions _options;
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(
            ApplicationDbContext context,
            IOptions<AuthenticationOptions> options,
            ILogger<AuthenticationService> logger)
        {
            _context = context;
            _options = options.Value;
            _logger = logger;
        }

        public AuthenticationToken? Authenticate(User user)
        {
            var u = _context.Users
                .FirstOrDefault(x => x.Username == user.Username && x.Password == user.Password);

            if (u == null)
            {
                return null;
            }

            return CreateAuthenticationToken(u);
        }

        private AuthenticationToken CreateAuthenticationToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_options.Key);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim("sub", user.UserId.ToString()),
                new Claim("admin", user.Admin.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                IssuedAt = DateTime.UtcNow,
                Issuer = _options.Issuer,
                Audience = _options.Audience,
                Expires = DateTime.UtcNow.AddMinutes(_options.Expiration),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticationToken
            {
                Name = "authentication_token",
                Value = tokenHandler.WriteToken(token)
            };
        }
    }

    public class AuthenticationOptions
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public int Expiration { get; set; }
    }
}
