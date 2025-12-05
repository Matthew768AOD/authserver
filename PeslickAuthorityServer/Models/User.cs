namespace PeslickAuthorityServer.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? Email { get; set; }
        public bool Admin { get; set; }
    }
}
