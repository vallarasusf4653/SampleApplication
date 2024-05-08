using System;
using System;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }


        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(_dbContext.bookList.ToList());
        }


        [HttpGet("{bookid}")]
        public IActionResult GetBook(int bookid)
        {
            var book = _dbContext.bookList.FirstOrDefault(m => m.BookID == bookid);
            //System.Console.WriteLine(borrowid);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }


        [HttpPost]
        public IActionResult PostBook([FromBody] BookDetails book)
        {
            _dbContext.bookList.Add(book);

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpPut("{bookid}")]
        public IActionResult PutUser(int bookid, [FromBody] BookDetails book)
        {
            var bookold = _dbContext.bookList.FirstOrDefault(m => m.BookID==bookid);
            if (bookold == null)
            {
                return NotFound();
            }
        
        bookold.BookName=book.BookName;
        bookold.AuthorName=book.AuthorName;
        bookold.BookCount=book.BookCount;

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpDelete("{bookid}")]
        public IActionResult DeleteUser(int bookid)
        {
            var book = _dbContext.bookList.FirstOrDefault(m => m.BookID==bookid);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.bookList.Remove(book);
            _dbContext.SaveChanges();


            return Ok();
        }
    }
}



