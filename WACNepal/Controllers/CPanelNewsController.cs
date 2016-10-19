using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class CPanelNewsController : Controller
    {
        private AppDbContext db = new AppDbContext();
        // GET: CPanelNews
        public ActionResult Index()
        {
            return View();
        }
        
        [GZipOrDeflate]
        public JsonResult getAll()
        {
            var List = db.AllNews.OrderByDescending(s => s.id).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getNewsById(string newsID)
        {
            int no = Convert.ToInt32(newsID);
            var List = db.AllNews.Find(no);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveNews(news_tb everyNews)
        {
            try
            {
                if (everyNews.base64 != "null")
                {
                    string base64Data = Convert.ToString(everyNews.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    everyNews.image = baseBytes.image(840, 540, base64Data);
                    everyNews.thumbnail = baseBytes.image(310, 210, base64Data);
                }
                everyNews.posted_date = DateTime.Now;
                db.AllNews.Add(everyNews);
                db.SaveChanges();
                return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex) { return Json(ex.Message, JsonRequestBehavior.AllowGet); }
        }

        public string UpdateNews(string PrjId, news_tb nws)
        {
            if (nws != null)
            {
                //int no = Convert.ToInt32(tutorial.imageid);
                //var ProjectList = db.Images.Where(x => x.imageid == no).FirstOrDefault();
                ////ProjectList.imagename = tutorial.imagename;
                //db.Entry(tutorial).State = EntityState.Modified;
                //db.SaveChanges();

                db.AllNews.Attach(nws);
                var entry = db.Entry(nws);
                entry.Property(e => e.title).IsModified = true;
                entry.Property(e => e.detail).IsModified = true;
                entry.Property(e => e.eventDate).IsModified = true;
                entry.Property(e => e.news_type).IsModified = true;
                entry.Property(e => e.ytubeLink).IsModified = true;

                if (nws.base64 != "null")
                {
                    string base64Data = Convert.ToString(nws.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    nws.image = baseBytes.image(840, 540, base64Data);
                    nws.thumbnail = baseBytes.image(310, 210, base64Data);
                    entry.Property(e => e.image).IsModified = true;
                    entry.Property(e => e.thumbnail).IsModified = true;
                }

                db.SaveChanges();
                return "News Updated";
            }
            else
            {
                return "Invalid News";
            }
        }

        //public string DeleteNews(projectImage tutorial)
        //{
        //    if (tutorial != null)
        //    {
        //            int no = Convert.ToInt32(tutorial.imageid);
        //            var tut = db.Images.Where(x => x.imageid == no).FirstOrDefault();
        //            db.Images.Remove(tut);
        //            db.SaveChanges();
        //            return "Project Deleted";
        //    }
        //    else
        //    {
        //        return "Invalid Poject";
        //    }
        //}
    }
}