using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class GalleryController : Controller
    {
        private AppDbContext db = new AppDbContext();
        // GET: Gallery
        public ActionResult Index()
        {
            return View();
        }

        [GZipOrDeflate]
        public JsonResult GetAll(int skipNo, int takeNo)
        {
            var List = (from g in db.gallery select new { g.caption, g.postedDate, g.ytubeLink, g.id}).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult GetById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from g in db.gallery where g.id.Equals(no) select new { g.caption, g.postedDate, g.ytubeLink, g.id }).FirstOrDefault();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpPost]
        public string SaveGallery(Gallery gallery)
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
                return "Gallery Saved";
            }
            catch (Exception ex) { return ex.Message; }
        }

        public string Update(string PrjId, Gallery g)
        {
                db.gallery.Attach(g);
                var entry = db.Entry(g);
                entry.Property(e => e.caption).IsModified = true;
                entry.Property(e => e.ytubeLink).IsModified = true;

                if (g.base64 != "null")
                {
                    string base64Data = Convert.ToString(g.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    g.image = baseBytes.image(840, 540, base64Data);
                    g.thumbnail = baseBytes.image(310, 210, base64Data);
                    entry.Property(e => e.image).IsModified = true;
                    entry.Property(e => e.thumbnail).IsModified = true;
                }

                db.SaveChanges();
                return "Updated";
        }
        public string Delete(string id)
        {
            int no = Convert.ToInt32(id);
            var tut = db.gallery.Where(x => x.id == no).FirstOrDefault();
            db.gallery.Remove(tut);
            db.SaveChanges();
            return "Successfully Deleted";
        }
    }
}