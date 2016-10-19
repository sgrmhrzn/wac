using Heroic.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WACNepal.Core;

namespace WACNepal.Models
{
    public class projectViewModel : IMapFrom<project_tb>
    {
        public int id { get; set; }

        public string program_title { get; set; }

        public string description { get; set; }
    }

}