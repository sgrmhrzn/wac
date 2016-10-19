using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WACNepal.Core
{
    public class projectImage
    {
        [Key]
        public int imageid { get; set; }

        public int project_id { get; set; }

        public string imagename { get; set; }

        public byte[] imagedata { get; set; }

    }
}