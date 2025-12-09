public class LoginResponse
{
    public string Name { get; set; } = "";
    public string Value { get; set; } = "";
}

public class LoginRequest
{
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
}