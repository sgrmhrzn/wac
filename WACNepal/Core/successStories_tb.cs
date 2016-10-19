using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACNepal.Core
{
    public class successStories_tb
    {
        [Key]
        public int id { get; set; }

        public string title { get; set; }

        [AllowHtml]
        public string description { get; set; }

        public DateTime date { get; set; }

        [NotMapped]
        public HttpPostedFileBase image { get; set; }

        public string ytubeLink { get; set; }

        public byte[] imageData { get; set; }

        public byte[] thumbnail { get; set; }

        [NotMapped]
        public string base64 { get; set; }
    }
}