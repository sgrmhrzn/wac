using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    public class ProjectsController : Controller
    {
        private AppDbContext db = new AppDbContext();
        [OutputCache(Duration = 300, VaryByParam = "none")] //cached for 300 seconds  

        [GZipOrDeflate]
        public ActionResult Detail()
        {
            return View();
        }

        [GZipOrDeflate]
        public ActionResult Completed()
        {
            return View();
        }

        [GZipOrDeflate]
        public ActionResult Ongoing()
        {
            return View();
        }
        [GZipOrDeflate]
        public JsonResult GetProjects(int skipNo, int takeNo, string type)
        {
            if (type != "")
            {
                var List = (from projects in db.AllProjects where projects.project_status.Equals(type) select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                var List = (from projects in db.AllProjects select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
        }
        [GZipOrDeflate]
        public JsonResult OnGoingProjects(int skipNo, int takeNo)
        {
            var List = (from projects in db.AllProjects where projects.project_status == "ongoing" select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult CompletedProjects(int skipNo, int takeNo)
        {
            var List = (from projects in db.AllProjects where projects.project_status.Equals("completed") select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getProjectById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from projects in db.AllProjects where projects.id.Equals(no) select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).FirstOrDefault();
            var jsonResult = Json(List, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [GZipOrDeflate]
        [System.Web.Mvc.HttpPost]
        public ActionResult SaveTutorial(project_tb projects)
        {
            string base64Data = Convert.ToString(projects.base64);
            base64ToByte baseBytes = new base64ToByte();
            projects.imageData = baseBytes.image(840, 540, base64Data);
            projects.thumbnail = baseBytes.image(310, 210, base64Data);


            projects.posted_date = DateTime.Now;
            db.AllProjects.Add(projects);
            db.SaveChanges();
            return Json("Successfully Added", JsonRequestBehavior.AllowGet);
        }

        public string UpdateProject(string PrjId, project_tb prj)
        {
            if (prj != null)
            {

                db.AllProjects.Attach(prj);
                var entry = db.Entry(prj);
                entry.Property(e => e.title).IsModified = true;
                entry.Property(e => e.description).IsModified = true;
                entry.Property(e => e.duration).IsModified = true;
                entry.Property(e => e.category).IsModified = true;
                entry.Property(e => e.project_status).IsModified = true;
                entry.Property(e => e.ytubeLink).IsModified = true;

                if (prj.base64 != "null")
                {
                    string base64Data = Convert.ToString(prj.base64);
                    base64ToByte baseBytes = new base64ToByte();
                    prj.imageData = baseBytes.image(840, 540, base64Data);
                    prj.thumbnail = baseBytes.image(310, 210, base64Data);
                    entry.Property(e => e.imageData).IsModified = true;
                    entry.Property(e => e.thumbnail).IsModified = true;
                }

                db.SaveChanges();
                return "Successfully Updated";
            }
            else
            {
                return "Invalid Project";
            }
        }

        public string Delete(string id)
        {
            int no = Convert.ToInt32(id);
            var tut = db.AllProjects.Where(x => x.id == no).FirstOrDefault();
            db.AllProjects.Remove(tut);
            db.SaveChanges();
            return "Successfully Deleted";
        }
    }
}