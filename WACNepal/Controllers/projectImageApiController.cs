using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class projectImageApiController : ApiController
    {
        private AppDbContext db = new AppDbContext();

    //    // GET: api/FileUploads
    //    public IQueryable<projectImage> GetfileUpload()
    //    {
    //        return db.prjImage;
    //    }

    //    // GET: api/FileUploads/5
    //    [ResponseType(typeof(projectImage))]
    //    public IHttpActionResult GetFileUpload(int id)
    //    {
    //        projectImage prjImgUpload = db.prjImage.Find(id);
    //        if (prjImgUpload == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(prjImgUpload);
    //    }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutFileUpload(int id, HttpPostedFileBase ImgUpload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prjIdToUpdate = db.AllProjects.Find(id);

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                //Get the uploaded image from the Files collection  
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                if (httpPostedFile != null)
                {
                    //project_tb imgupload = new project_tb();
                    //int length = httpPostedFile.ContentLength;
                    //prjIdToUpdate.image = new byte[length]; //get imagedata  
                    //httpPostedFile.InputStream.Read(imgupload.image, 0, length);
                    ////imgupload.imagename = Path.GetFileName(httpPostedFile.FileName);
                    //db.Entry(prjIdToUpdate).State = EntityState.Modified;
                    //db.SaveChanges();
                    //var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), httpPostedFile.FileName);
                    //// Save the uploaded file to "UploadedFiles" folder  
                    //httpPostedFile.SaveAs(fileSavePath);

                    return Ok("Image Uploaded");
                }
                
            }
                return Ok("Image is not Uploaded");
        }
            
    //        return StatusCode(HttpStatusCode.NoContent);
    //    }

        // GET: api/PicApi
        //[HttpPost]
        //public IHttpActionResult PostFileUpload()
        //{

        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //         //Get the uploaded image from the Files collection  
        //        var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
        //        if (httpPostedFile != null)
        //        {
        //            project_tb imgupload = new project_tb();
        //            int length = httpPostedFile.ContentLength;
        //            imgupload.image = new byte[length]; //get imagedata  
        //            httpPostedFile.InputStream.Read(imgupload.image, 0, length);
        //            //imgupload.imagename = Path.GetFileName(httpPostedFile.FileName);
        //            db.AllProjects.Add(imgupload);
        //            db.SaveChanges();
        //            var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), httpPostedFile.FileName);
        //            // Save the uploaded file to "UploadedFiles" folder  
        //            httpPostedFile.SaveAs(fileSavePath);

        //            return Ok("Image Uploaded");
        //        }
        //    }
        //    return Ok("Image is not Uploaded");
        //}

      

    }

}