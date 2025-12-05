using PeslickAuthorityServer.Data;
using PeslickAuthorityServer.Models;

namespace PeslickAuthorityServer;

public static class DataSeeder
{
    public static void Seed(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        db.Database.EnsureCreated();

        if (!db.Users.Any(u => u.Username == "admin"))
        {
            db.Users.Add(new User
            {
                Username = "admin",
                Password = "admin",
                Email = "admin@example.com",
                Admin = true
            });
        }

        if (!db.Users.Any(u => u.Username == "basicuser"))
        {
            db.Users.Add(new User
            {
                Username = "basicuser",
                Password = "basicuser",
                Email = "user@example.com",
                Admin = false
            });
        }

        db.SaveChanges();
    }
}
