namespace QuotesApi.Dtos
{
    public class QuoteDTO
    {
        public int QuoteId { get; set; }
        public string Text { get; set; } = string.Empty;
        public string? Tags { get; set; }

        public int AuthorId { get; set; }
        public required AuthorDTO Author { get; set; }
    }
}
