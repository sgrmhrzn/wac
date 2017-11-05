using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WACNepal.Core;
using WACNepal.Data;

namespace WACNepal.Controllers
{
    [GZipOrDeflate]
    public class CPanelController : Controller
    {
        private AppDbContext db = new AppDbContext();
        // GET: CPanel
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult success()
        {
            return View();
        }
       
        public ActionResult LogOff()
        {
            //AuthenticationManager.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "CPanel");
        }
    }
}