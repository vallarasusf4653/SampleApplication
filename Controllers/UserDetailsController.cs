using System;
using System;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }


        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_dbContext.userList.ToList());
        }


        [HttpGet("{userid}")]
        public IActionResult GetUser(int userid)
        {
            var user = _dbContext.userList.FirstOrDefault(m => m.UserID == userid);
            System.Console.WriteLine(userid);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.userList.Add(user);

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpPut("{userid}")]
        public IActionResult PutUser(int userid, [FromBody] UserDetails user)
        {
            var userold = _dbContext.userList.FirstOrDefault(m => m.UserID == userid);
            if (userold == null)
            {
                return NotFound();
            }
           userold.UserName=user.UserName;
           userold.UserEmail=user.UserEmail;
           userold.Password=user.Password;
           userold.Gender=user.Gender;
           userold.Department=user.Department;
           userold.MobileNumber=user.MobileNumber;
           userold.WalletBalance=user.WalletBalance;

            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpDelete("{userid}")]
        public IActionResult DeleteUser(int userid)
        {
            var user = _dbContext.userList.FirstOrDefault(m => m.UserID == userid);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.userList.Remove(user);
            _dbContext.SaveChanges();


            return Ok();
        }
    }
}



