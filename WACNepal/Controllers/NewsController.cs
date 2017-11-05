using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class NewsController : Controller
    {
        // GET: News
        public ActionResult Index()
        {
            return View();
        }

        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        public JsonResult getAll(int skipNo, int takeNo, string type)
        {
            if (type != "")
            {
                var List = (from news in db.AllNews where news.news_type.Equals(type) select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                var List = (from news in db.AllNews select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
        }
        [GZipOrDeflate]
        public JsonResult getAllNotices(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Notice") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getAllNews(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("News") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [GZipOrDeflate]
        public JsonResult getAllCareers(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Vacancy") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [GZipOrDeflate]
        public JsonResult getAllReports(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Report") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getNewsById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from news in db.AllNews where news.id.Equals(no) select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).FirstOrDefault();
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
    }
}