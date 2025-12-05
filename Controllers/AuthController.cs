using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeslickAuthorityServer.Models;
using PeslickAuthorityServer.Services;

namespace PeslickAuthorityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = new User
            {
                Username = request.Username,
                Password = request.Password
            };

            var token = _authenticationService.Authenticate(user);

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            return Ok(token);
        }

    }
}
