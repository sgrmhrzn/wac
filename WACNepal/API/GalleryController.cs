using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.API
{
    [Route("api/gallery")]
    public class GalleryController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        // GET api/<controller>
        [GZipOrDeflate]
        [HttpGet]
        public HttpResponseMessage Get(int skipNo, int takeNo)
        {
            var list = (from g in db.gallery select new { g.caption, g.postedDate, g.ytubeLink, g.id })
                .OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();

            //var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            //jsonResult.MaxJsonLength = int.MaxValue;
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        // GET api/<controller>/5
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Gallery gallery)
        {
            try
            {
                if (gallery.base64 != "null")
                {
                    string base64Data = Convert.ToString(gallery.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    gallery.image = baseBytes.image(840, 540, base64Data);
                    gallery.thumbnail = baseBytes.image(310, 210, base64Data);
                }
                gallery.postedDate = DateTime.Now;
                db.gallery.Add(gallery);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, gallery);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        public HttpResponseMessage Put([FromBody]Gallery gallery)
        {
            try
            {
                db.gallery.Attach(gallery);
                var entry = db.Entry(gallery);
                entry.Property(e => e.caption).IsModified = true;
                entry.Property(e => e.ytubeLink).IsModified = true;

                if (gallery.base64 != "null")
                {
                    string base64Data = Convert.ToString(gallery.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    gallery.image = baseBytes.image(840, 540, base64Data);
                    gallery.thumbnail = baseBytes.image(310, 210, base64Data);
                    entry.Property(e => e.image).IsModified = true;
                    entry.Property(e => e.thumbnail).IsModified = true;
                }

                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, gallery);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);

            }
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            int no = Convert.ToInt32(id);
            var tut = db.gallery.Where(x => x.id == no).FirstOrDefault();
            db.gallery.Remove(tut);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully Deleted.");
        }

    }
}