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
    [RoutePrefix("api/projects")]
    public class ProjectsController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        [HttpGet]
        public HttpResponseMessage GetProjects(int skipNo, int takeNo, string type)
        {
            if (type != "" && type != null)
            {
                var List = (from projects in db.AllProjects where projects.project_status.Equals(type) select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, List);
            }
            else
            {
                var List = (from projects in db.AllProjects select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, List);

            }
        }
        [GZipOrDeflate]
        [HttpGet]
        [Route("ongoing")]

        public HttpResponseMessage OnGoingProjects(int skipNo, int takeNo)
        {
            var List = (from projects in db.AllProjects where projects.project_status == "ongoing" select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }

        [GZipOrDeflate]
        [HttpGet]
        [Route("completed")]
        public HttpResponseMessage CompletedProjects(int skipNo, int takeNo)
        {
            var List = (from projects in db.AllProjects where projects.project_status.Equals("completed") select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }

        [GZipOrDeflate]
        public HttpResponseMessage getProjectById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from projects in db.AllProjects where projects.id.Equals(no) select new { projects.category, projects.description, projects.duration, projects.id, projects.posted_date, projects.project_status, projects.title, projects.ytubeLink }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }
        [GZipOrDeflate]
        [HttpPost]
        public HttpResponseMessage SaveTutorial([FromBody]project_tb projects)
        {
            string base64Data = Convert.ToString(projects.base64);
            base64ToByte baseBytes = new base64ToByte();
            projects.imageData = baseBytes.image(840, 540, base64Data);
            projects.thumbnail = baseBytes.image(310, 210, base64Data);


            projects.posted_date = DateTime.Now;
            db.AllProjects.Add(projects);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully added.");

        }

        [HttpPut]
        public HttpResponseMessage UpdateProject([FromBody]project_tb prj)
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
                return Request.CreateResponse(HttpStatusCode.OK, "Successfully updated.");

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NoContent, "Unable to update.");

            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(string id)
        {
            int no = Convert.ToInt32(id);
            var tut = db.AllProjects.Where(x => x.id == no).FirstOrDefault();
            db.AllProjects.Remove(tut);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully deleted.");

        }
    }
}