using System;
using System;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }


        [HttpGet]
        public IActionResult GetBorrowBooks()
        {
            return Ok(_dbContext.borrowList.ToList());
        }


        [HttpGet("{borrowid}")]
        public IActionResult GetBorrowBook(int borrowid)
        {
            var book = _dbContext.borrowList.FirstOrDefault(m => m.BorrowID == borrowid);
            //System.Console.WriteLine(borrowid);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }


        [HttpPost]
        public IActionResult PostUser([FromBody] BorrowDetails book)
        {
            _dbContext.borrowList.Add(book);

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpPut("{borrowid}")]
        public IActionResult PutUser(int borrowid, [FromBody] BorrowDetails book)
        {
            var bookold = _dbContext.borrowList.FirstOrDefault(m => m.BorrowID==borrowid);
            if (bookold == null)
            {
                return NotFound();
            }
        bookold.BookID=book.BookID;
        bookold.UserID=book.UserID;
        bookold.BorrowedDate=book.BorrowedDate;
        bookold.BorrowBookCount=book.BorrowBookCount;
        bookold.Status=book.Status;
        bookold.PaidFineAmount=book.PaidFineAmount;

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpDelete("{borrowid}")]
        public IActionResult DeleteUser(int borrowid)
        {
            var book = _dbContext.borrowList.FirstOrDefault(m => m.BorrowID==borrowid);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.borrowList.Remove(book);
            _dbContext.SaveChanges();


            return Ok();
        }
    }
}



