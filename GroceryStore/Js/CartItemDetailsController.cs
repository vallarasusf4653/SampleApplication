
using Microsoft.AspNetCore.Mvc;

namespace GroceryStoreApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CartItemDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public CartItemDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }


        [HttpGet]
        public IActionResult GetBooked()
        {
            return Ok(_dbContext.cartList.ToList());
        }


        [HttpGet("{bookingid}")]
        public IActionResult GetBook(int bookingid)
        {
            var user = _dbContext.cartList.FirstOrDefault(m => m.CartItemID == bookingid);
           
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpPost]
        public IActionResult PostBooking([FromBody] CartItemDetails product)
        {
            _dbContext.cartList.Add(product);

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpPut("{bookingid}")]
        public IActionResult PutProduct(int bookingid, [FromBody] CartItemDetails product)
        {
            var productOld = _dbContext.cartList.FirstOrDefault(m => m.CartItemID == bookingid);
            if (productOld == null)
            {
                return NotFound();
            }
            productOld.ProductCount = product.ProductCount;
            productOld.ProductName = product.ProductName;
            productOld.ProductPrice=product.ProductPrice;

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpDelete("{bookingid}")]
        public IActionResult DeleteProduct(int bookingid)
        {
            var product = _dbContext.cartList.FirstOrDefault(m => m.CartItemID == bookingid);
            if (product == null)
            {
                return NotFound();
            }
            _dbContext.cartList.Remove(product);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}

