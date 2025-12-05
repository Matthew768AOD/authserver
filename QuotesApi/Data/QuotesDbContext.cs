using Microsoft.EntityFrameworkCore;
using QuotesApi.Models;
using System.Collections.Generic;

namespace QuotesApi.Data
{
    public class QuotesDbContext : DbContext
    {
        public QuotesDbContext(DbContextOptions<QuotesDbContext> options)
            : base(options)
        {
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Quote> Quotes { get; set; }
    }
}
