using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACNepal.Controllers
{
    public class StoriesController : Controller
    {
        // GET: Stories
        public ActionResult Index()
        {
            return View();
        }
    }
}