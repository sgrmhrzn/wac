using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.API
{
    [RoutePrefix("api/news")]
    public class NewsController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        [GZipOrDeflate]
        [HttpGet]
        public HttpResponseMessage getAll(int skipNo, int takeNo, string type)
        {
            if (type != "" && type != null)
            {
                var List = (from news in db.AllNews where news.news_type.Equals(type) select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, List);
            }
            else
            {
                var List = (from news in db.AllNews select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, List);

            }
        }
        [GZipOrDeflate]
        [Route("notices")]
        [HttpGet]

        public HttpResponseMessage getAllNotices(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Notice") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);
        }

        [GZipOrDeflate]
        [Route("updates")]
        [HttpGet]
        public HttpResponseMessage getAllNews(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("News") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }
        [GZipOrDeflate]
        [Route("vacancies")]
        [HttpGet]
        public HttpResponseMessage getAllCareers(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Vacancy") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }
        [GZipOrDeflate]
        [Route("reports")]
        [HttpGet]
        public HttpResponseMessage getAllReports(int skipNo, int takeNo)
        {
            var List = (from news in db.AllNews where news.news_type.Equals("Report") select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).Skip(skipNo).Take(takeNo).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, List);
        }

        [GZipOrDeflate]
        [HttpGet]
        public HttpResponseMessage getNewsById(string id)
        {
            int no = Convert.ToInt32(id);
            var List = (from news in db.AllNews where news.id.Equals(no) select new { news.detail, news.eventDate, news.id, news.news_type, news.posted_date, news.title, news.ytubeLink }).OrderByDescending(s => s.id).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, List);

        }

        [HttpPost]
        public HttpResponseMessage SaveNews([FromBody]news_tb everyNews)
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
                return Request.CreateResponse(HttpStatusCode.OK, "Added Successfully.");

            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Unable to add.");

            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateNews([FromBody]news_tb nws)
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
                return Request.CreateErrorResponse(HttpStatusCode.OK, "Successfully updated.");

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
            var tut = db.AllNews.Where(x => x.id == no).FirstOrDefault();
            db.AllNews.Remove(tut);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Successfully deleted.");
        }
    }
}