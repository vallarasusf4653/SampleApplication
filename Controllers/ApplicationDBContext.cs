using Microsoft.EntityFrameworkCore;



namespace LibraryManagementApi.Controllers
{


    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        public DbSet<UserDetails> userList {get; set;}
        public DbSet <BookDetails> bookList {get; set;}
        public DbSet <BorrowDetails> borrowList {get; set;}
    }
}