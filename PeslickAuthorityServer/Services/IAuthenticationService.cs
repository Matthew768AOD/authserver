using PeslickAuthorityServer.Models;

namespace PeslickAuthorityServer.Services
{
    public interface IAuthenticationService
    {
        AuthenticationToken? Authenticate(User user);
    }
}
