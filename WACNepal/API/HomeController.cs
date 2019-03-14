using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.API
{
    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        [HttpGet]
        [Route("ongoing")]
        public HttpResponseMessage OnGoingProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "ongoing").OrderByDescending(s => s.id).Take(2);
            return Request.CreateResponse(HttpStatusCode.OK, projectList);
        }

        [GZipOrDeflate]
        [HttpGet]
        [Route("completed")]
        public HttpResponseMessage CompletedProjects()
        {
            var projectList = db.AllProjects.ToList().Where(s => s.project_status == "completed").OrderByDescending(s => s.id).Take(3);
            return Request.CreateResponse(HttpStatusCode.OK, projectList);

        }

        [HttpGet]
        [Route("project")]
        public HttpResponseMessage getProjectById(string PrjId)
        {
            int no = Convert.ToInt32(PrjId);
            var ProjectList = db.AllProjects.Find(no);
            return Request.CreateResponse(HttpStatusCode.OK, ProjectList);

        }
        [HttpGet]
        [GZipOrDeflate]
        [Route("stories")]

        public HttpResponseMessage getAllStories()
        {
            var stories = db.successStories.ToList().OrderByDescending(s => s.id).Take(2);
            return Request.CreateResponse(HttpStatusCode.OK, stories);

        }

        [HttpGet]
        [GZipOrDeflate]
        [Route("news")]
        public HttpResponseMessage getAllNews()
        {
            var news = db.AllNews.ToList().OrderByDescending(s => s.id).Take(5);
            return Request.CreateResponse(HttpStatusCode.OK, news);

        }

        [HttpGet]
        [Route("new")]
        public HttpResponseMessage getNewsById(string ID)
        {
            int no = Convert.ToInt32(ID);
            var news = db.AllNews.Find(no);
            return Request.CreateResponse(HttpStatusCode.OK, news);
        }
    }
}