namespace QuotesApi.Models
{
    public class Quote
    {
        public int QuoteId { get; set; }

        public string Text { get; set; } = string.Empty;

        public string? Tags { get; set; }

        public int AuthorId { get; set; }

        public Author? Author { get; set; }

        public int? CreatedByUserId { get; set; }
    }
}
