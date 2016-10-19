using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class CPanelStoriesController : Controller
    {
        private AppDbContext db = new AppDbContext();
        // GET: CPanel
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getAll()
        {
                var storiesList = db.successStories.OrderByDescending(s => s.id).ToList();
                var jsonResult = Json(storiesList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
        }

        public JsonResult getRecordById(string ID)
        {
                int no = Convert.ToInt32(ID);
                var ProjectList = db.successStories.Find(no);
                return Json(ProjectList, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Mvc.HttpPost]
        public ActionResult SaveStories(successStories_tb stories)
        {
            string base64Data = Convert.ToString(stories.base64);
            base64ToByte baseBytes = new base64ToByte();
            stories.imageData = baseBytes.image(840, 540, base64Data);
            stories.thumbnail = baseBytes.image(310, 210, base64Data);

            stories.date = DateTime.Now;
            db.successStories.Add(stories);
            db.SaveChanges();
            return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
        }

        public string UpdateRecord(string ID, successStories_tb stories)
        {
            if (stories != null)
            {
                db.successStories.Attach(stories);
                var entry = db.Entry(stories);

                entry.Property(e => e.title).IsModified = true;
                entry.Property(e => e.description).IsModified = true;
                entry.Property(e => e.ytubeLink).IsModified = true;


                if (stories.base64 != "null")
                {
                    string base64Data = Convert.ToString(stories.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    stories.imageData = baseBytes.image(840, 540, base64Data);
                    stories.thumbnail = baseBytes.image(310, 210, base64Data);

                    entry.Property(e => e.imageData).IsModified = true;
                    entry.Property(e => e.thumbnail).IsModified = true;
                }
                db.SaveChanges();
                return "Record Updated";


            }
            else
            {
                return "Invalid Record";
            }
        }

        //public string DeleteEmployee(projectImage tutorial)
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