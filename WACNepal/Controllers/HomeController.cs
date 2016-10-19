using System;
using System.Collections.Generic;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Data;
using WACNepal.Models;
using WACNepal.Core;

namespace WACNepal.Controllers
{
    public class HomeController : Controller
    {
        private AppDbContext db = new AppDbContext();
        [OutputCache(Duration = 300, VaryByParam = "none")] //cached for 300 seconds  
        
        [GZipOrDeflate]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [GZipOrDeflate]
        public JsonResult OnGoingProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "ongoing").OrderByDescending(s => s.id).Take(2);
            var jsonResult = Json(projectList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult CompletedProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "completed").OrderByDescending(s => s.id).Take(3);
                var jsonResult = Json(projectList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
        }


        public JsonResult getProjectById(string PrjId)
        {
            int no = Convert.ToInt32(PrjId);
            var ProjectList = db.AllProjects.Find(no);
            var jsonResult = Json(ProjectList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getAllStories()
        {
            var stories = db.successStories.ToList().OrderByDescending(s => s.id).Take(2);
            var jsonResult = Json(stories, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [GZipOrDeflate]
        public JsonResult getAllNews()
        {
            var news = db.AllNews.ToList().OrderByDescending(s => s.id).Take(5);
            var jsonResult = Json(news, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult getNewsById(string ID)
        {
            int no = Convert.ToInt32(ID);
            var news = db.AllNews.Find(no);
            var jsonResult = Json(news, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}