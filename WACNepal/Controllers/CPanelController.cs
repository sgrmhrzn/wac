using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    [GZipOrDeflate]
    public class CPanelController : Controller
    {
        private AppDbContext db = new AppDbContext();
        // GET: CPanel
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult success()
        {
            return View();
        }

    [GZipOrDeflate]
        public JsonResult getAll()
        {
                var projectList = db.AllProjects.OrderByDescending(s => s.id).ToList();
                var jsonResult = Json(projectList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getProjectById(string PrjId)
        {
                int no = Convert.ToInt32(PrjId);
                var ProjectList = db.AllProjects.Find(no);
                return Json(ProjectList, JsonRequestBehavior.AllowGet);
        }

        [GZipOrDeflate]
        [System.Web.Mvc.HttpPost]
        public ActionResult SaveTutorial(project_tb projects)
        {
            //foreach (string file in Request.Files)
            //{
            //    var fileContent = Request.Files[file];
            //    if (fileContent != null && fileContent.ContentLength > 0)
            //    {
            //    int length = fileContent.ContentLength;
            //using (var streamOriginal = new MemoryStream(length))
            //using (var imgOriginal = Image.FromStream(streamOriginal))
            //{
            //    projects.imageData = new byte[length]; //get imagedata  
            //    fileContent.InputStream.Read(projects.imageData, 0, length);

            //    projects.posted_date = DateTime.Now;
            //    db.AllProjects.Add(projects);
            //    db.SaveChanges();
            //}
            string base64Data = Convert.ToString(projects.base64);
            base64ToByte baseBytes = new base64ToByte();
            projects.imageData = baseBytes.image(840, 540, base64Data);
            projects.thumbnail = baseBytes.image(310, 210, base64Data);


            projects.posted_date = DateTime.Now;
            db.AllProjects.Add(projects);
            db.SaveChanges();
            //    }
            //}
            return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
        }

        public string UpdateProject(string PrjId, project_tb prj)
        {
            if (prj != null)
            {
                //int no = Convert.ToInt32(tutorial.imageid);
                //var ProjectList = db.Images.Where(x => x.imageid == no).FirstOrDefault();
                ////ProjectList.imagename = tutorial.imagename;
                //db.Entry(tutorial).State = EntityState.Modified;
                //db.SaveChanges();

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
                return "Project Updated";
            }
            else
            {
                return "Invalid Project";
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