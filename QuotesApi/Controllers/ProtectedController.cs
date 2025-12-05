using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace QuotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProtectedController : ControllerBase
    {
        // GET: /api/protected/me
        [HttpGet("me")]
        [Authorize]
        public IActionResult GetMe()
        {
            var username = User.Identity?.Name;
            var claims = User.Claims.Select(c => new { c.Type, c.Value });

            return Ok(new
            {
                Username = username,
                Claims = claims
            });
        }
    }
}
