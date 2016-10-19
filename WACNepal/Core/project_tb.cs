using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACNepal.Core
{
    public class project_tb
    {
        [Key]
        public int id { get; set; }

        public string title { get; set; }

        [AllowHtml]
        public string description { get; set; }

        public string duration { get; set; }

        public string category { get; set; }

        public DateTime posted_date { get; set; }

        public string ytubeLink { get; set; }

        public string project_status { get; set; }

        public byte[] imageData { get; set; }

        public byte[] thumbnail { get; set; }

        [NotMapped]
        public string base64 { get; set; }
    }
}