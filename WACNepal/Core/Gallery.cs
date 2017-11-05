using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WACNepal.Core
{
    public class Gallery
    {
        [Key]
        public int id { get; set; }
        public byte[] image { get; set; }
        public byte[] thumbnail { get; set; }
        public DateTime postedDate { get; set; }
        public string caption { get; set; }
        public string ytubeLink { get; set; }
        [NotMapped]
        public string base64 { get; set; }

    }
}