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
        public JsonResult OnGoingProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "ongoing").OrderBy(s => s.id);
            var jsonResult = Json(projectList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult CompletedProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "completed").OrderBy(s => s.id);
            var jsonResult = Json(projectList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getProjectById(string PrjId)
        {
            int no = Convert.ToInt32(PrjId);
            var ProjectList = db.AllProjects.Find(no);
            var jsonResult = Json(ProjectList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}