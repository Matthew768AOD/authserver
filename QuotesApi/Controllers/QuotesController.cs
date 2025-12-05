using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApi.Data;
using QuotesApi.Dtos;
using QuotesApi.Models;
using System.Security.Claims;

namespace QuotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuotesController : ControllerBase
    {
        private readonly QuotesDbContext _context;

        public QuotesController(QuotesDbContext context)
        {
            _context = context;
        }

        // GET: /api/quotes?authorId=1&search=life
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuoteDTO>>> GetQuotes()
        {
            var quotes = await _context.Quotes
                .Include(q => q.Author)
                .ToListAsync();

            var result = quotes.Select(q => new QuoteDTO
            {
                QuoteId = q.QuoteId,
                Text = q.Text,
                Tags = q.Tags,
                AuthorId = q.AuthorId,
                Author = new AuthorDTO
                {
                    AuthorId = q.Author!.AuthorId,
                    Name = q.Author.Name,
                    BirthYear = q.Author.BirthYear,
                    DeathYear = q.Author.DeathYear,
                    Description = q.Author.Description
                }
            });

            return Ok(result);
        }


        // GET: /api/quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var quote = await _context.Quotes
                .Include(q => q.Author)
                .FirstOrDefaultAsync(q => q.QuoteId == id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }

        // POST: /api/quotes
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
        {
            var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
            {
                quote.CreatedByUserId = userId;
            }

            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuote), new { id = quote.QuoteId }, quote);
        }

        // PUT: /api/quotes/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateQuote(int id, Quote quote)
        {
            if (id != quote.QuoteId)
            {
                return BadRequest();
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Quotes.Any(q => q.QuoteId == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: /api/quotes/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
