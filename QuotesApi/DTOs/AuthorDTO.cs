namespace QuotesApi.Dtos
{
    public class AuthorDTO
    {
        public int AuthorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? BirthYear { get; set; }
        public int? DeathYear { get; set; }
        public string? Description { get; set; }

        public List<QuoteSummaryDTO> Quotes { get; set; } = new();
    }

    public class QuoteSummaryDTO
    {
        public int QuoteId { get; set; }
        public string Text { get; set; } = string.Empty;
        public string? Tags { get; set; }
    }
}
