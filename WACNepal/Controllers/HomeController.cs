using System;
using System.Collections.Generic;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WACNepal.Data;
using WACNepal.Models;
using WACNepal.Core;

namespace WACNepal.Controllers
{
    public class HomeController : Controller
    {
        private AppDbContext db = new AppDbContext();
        [OutputCache(Duration = 300, VaryByParam = "none")] //cached for 300 seconds  
        
        [GZipOrDeflate]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

    }
}