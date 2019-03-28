using System.ComponentModel.DataAnnotations;
namespace pos.Models
{
    public class RegisterViewModel
    {
         [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Display(Name="User Name")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}9