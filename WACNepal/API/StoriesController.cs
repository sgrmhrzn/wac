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
    [Route("api/stories")]
    public class StoriesController : ApiController
    {
        // GET: Stories
        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        [HttpGet]
        public HttpResponseMessage getAllStories(int skipNo, int takeNo)
        {
            var List = (from story in db.successStories select new { story.date, story.description, story.id, story.title, story.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);
        }

        [GZipOrDeflate]
        [HttpGet]

        public HttpResponseMessage getStoryById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from story in db.successStories where story.id.Equals(no) select new { story.date, story.description, story.id, story.title, story.ytubeLink }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }

        [HttpPost]
        public HttpResponseMessage SaveStories([FromBody]successStories_tb stories)
        {
            string base64Data = Convert.ToString(stories.base64);
            base64ToByte baseBytes = new base64ToByte();
            stories.imageData = baseBytes.image(840, 540, base64Data);
            stories.thumbnail = baseBytes.image(310, 210, base64Data);

            stories.date = DateTime.Now;
            db.successStories.Add(stories);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully Added.");

        }
        [HttpPut]
        public HttpResponseMessage UpdateRecord([FromBody]successStories_tb stories)
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
                return Request.CreateResponse(HttpStatusCode.OK, "Successfully Updated.");



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
            var tut = db.successStories.Where(x => x.id == no).FirstOrDefault();
            db.successStories.Remove(tut);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully Deleted.");

        }
    }
}