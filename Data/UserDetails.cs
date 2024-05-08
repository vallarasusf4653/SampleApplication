using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryManagementApi;

[Table("UserDetails", Schema = "public")]
public class UserDetails
{
    [Key]
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string UserEmail { get; set; }
    public string Password { get; set; }
    public string Gender { get; set; }
    public string Department { get; set; }
    public string MobileNumber { get; set; }
    public double WalletBalance { get; set; }
    
}