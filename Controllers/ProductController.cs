using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pos.Data;
using pos.Models;
using Microsoft.AspNetCore.Authorization;

namespace pos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        //Get: api/products
         [HttpGet("[action]")]
         [Authorize(Policy = "RequireLoggedIn")]
         public IActionResult GetProducts()
        {
            return Ok(_db.Products.ToList());
        }
        
        [HttpPost("[action]")]
         [Authorize(Policy = "RequireAdministratorRole")]
        public async Task<IActionResult> AddProduct([FromBody] ProductModel formdata)
        {
            var newproduct = new ProductModel
            {
                Name = formdata.Name,
                ImageUrl = formdata.ImageUrl,
                Description = formdata.Description,
                OutOfStock = formdata.OutOfStock,
                Price = formdata.Price
            };

            await _db.Products.AddAsync(newproduct);

            await _db.SaveChangesAsync();

            return Ok(new JsonResult("The Product was Added Successfully"));
        }

        [HttpPut("[action]/{id}")]
         [Authorize(Policy = "RequireAdministratorRole")]
        public async Task<ActionResult> UpdateProduct( [FromRoute] int id, [FromBody] ProductModel formdata)
        {
         if (!ModelState.IsValid)
         {
             return BadRequest(ModelState);
         }
         var fidnProduct = _db.Products.FirstOrDefault(pos=>pos.ProductId==id);

         if (fidnProduct==null)
         {
             return NotFound();
         }

         //if the prodt was found
         fidnProduct.Name=formdata.Name;
         fidnProduct.Description=formdata.Description;
         fidnProduct.ImageUrl=formdata.ImageUrl;
         fidnProduct.OutOfStock=formdata.OutOfStock;
         fidnProduct.Price=formdata.Price;

         _db.Entry(fidnProduct).State = EntityState.Modified;
         await _db.SaveChangesAsync();
         return Ok(new JsonResult("the product with id " + id + "is update"));
        }
        
        [HttpDelete("[action]/{id}")]
         [Authorize(Policy = "RequireAdministratorRole")]
        public async Task<ActionResult>  DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);   
            }

            //foind the product
            var fidnProduct = await _db.Products.FindAsync(id);

            if (fidnProduct==null)
            {
                return NotFound();
            }

            _db.Products.Remove(fidnProduct);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult("The Product with id" + id + "is Deleted"));

        }
    }
}