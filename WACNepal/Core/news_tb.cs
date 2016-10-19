using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACNepal.Core
{
    public class news_tb
    {
        [Key]
        public int id { get; set;}

        [AllowHtml]
        public string detail { get; set; }

        public DateTime posted_date { get; set; }

        public string title { get; set; }

        public string ytubeLink { get; set; }

        public DateTime eventDate { get; set; }

        public string news_type { get; set; }

        public byte[] image { get; set; }

        public byte[] thumbnail { get; set; }

        [NotMapped]
        public string base64 { get; set; }

    }
}