using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApi.Data;
using QuotesApi.Dtos;
using QuotesApi.Models;

namespace QuotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // všichni přihlášení mohou číst
    public class AuthorsController : ControllerBase
    {
        private readonly QuotesDbContext _context;

        public AuthorsController(QuotesDbContext context)
        {
            _context = context;
        }

        // GET: /api/authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorDTO>>> GetAuthors()
        {
            var authors = await _context.Authors
                .Include(a => a.Quotes)
                .ToListAsync();

            var result = authors.Select(a => new AuthorDTO
            {
                AuthorId = a.AuthorId,
                Name = a.Name,
                BirthYear = a.BirthYear,
                DeathYear = a.DeathYear,
                Description = a.Description,

                Quotes = a.Quotes.Select(q => new QuoteSummaryDTO
                {
                    QuoteId = q.QuoteId,
                    Text = q.Text,
                    Tags = q.Tags
                }).ToList()
            });

            return Ok(result);
        }


        // GET: /api/authors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
            var author = await _context.Authors
                .Include(a => a.Quotes)
                .FirstOrDefaultAsync(a => a.AuthorId == id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        // POST: /api/authors  (jen admin)
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Author>> CreateAuthor(Author author)
        {
            _context.Authors.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthor), new { id = author.AuthorId }, author);
        }

        // PUT: /api/authors/5  (jen admin)
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateAuthor(int id, Author author)
        {
            if (id != author.AuthorId)
            {
                return BadRequest();
            }

            _context.Entry(author).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Authors.Any(a => a.AuthorId == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: /api/authors/5  (jen admin)
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
