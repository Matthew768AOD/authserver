public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}