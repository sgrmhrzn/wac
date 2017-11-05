using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class StoriesController : Controller
    {
        // GET: Stories
        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        public JsonResult getAllStories(int skipNo, int takeNo)
        {
            var List = (from story in db.successStories select new {story.date, story.description, story.id, story.title, story.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getStoryById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from story in db.successStories where story.id.Equals(no) select new {story.date, story.description, story.id, story.title, story.ytubeLink }).FirstOrDefault();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
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
            return Json("Successfully Added", JsonRequestBehavior.AllowGet);
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
                return "Successfully Updated";


            }
            else
            {
                return "Invalid Record";
            }
        }

        public string Delete(string id)
        {
            int no = Convert.ToInt32(id);
            var tut = db.successStories.Where(x => x.id == no).FirstOrDefault();
            db.successStories.Remove(tut);
            db.SaveChanges();
            return "Successfully Deleted";
        }
    }
}