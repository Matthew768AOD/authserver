namespace QuotesApi.Models
{
    public class Author
    {
        public int AuthorId { get; set; }

        public string Name { get; set; } = string.Empty;

        public int? BirthYear { get; set; }

        public int? DeathYear { get; set; }

        public string? Description { get; set; }

        public ICollection<Quote> Quotes { get; set; } = new List<Quote>();
    }
}
