using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

public sealed class Session
{
    private static readonly Lazy<Session> _instance = new(() => new Session());
    public static Session Instance => _instance.Value;

    private Session() { }

    public string? JwtToken { get; private set; }
    public ClaimsPrincipal? Principal { get; private set; }

    public bool IsAuthenticated => !string.IsNullOrEmpty(JwtToken);
    public bool IsAdmin =>
        Principal?.HasClaim(c =>
            c.Type == "admin" &&
            c.Value.Equals("True", StringComparison.OrdinalIgnoreCase)
        ) == true;

    public void SetToken(string token)
    {
        JwtToken = token;

        var handler = new JwtSecurityTokenHandler();
        try
        {
            var jwt = handler.ReadJwtToken(token);
            var identity = new ClaimsIdentity(jwt.Claims, "jwt");
            Principal = new ClaimsPrincipal(identity);
        }
        catch
        {
            Principal = null;
        }
    }

    public void Clear()
    {
        JwtToken = null;
        Principal = null;
    }
}