using System.Web;
using System.Web.Optimization;

namespace WACNepal
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

        bundles.Add(new StyleBundle("~/css/UIall")
               .Include("~/Content/main.css")
               .Include("~/Content/header.css")
               .Include("~/Content/others.css")
               );

        //bundles.Add(new Bundle("~/bundles/Scripts")
        //       .Include("~/Scripts/jquery-{version}.js")
        //       //.Include("~/Scripts/jquery-3.1.1.min.js")
        //       .Include("~/Scripts/tinymce/tinymce.min.js")
        //       .Include("~/Scripts/AngularJs/angular.min.js")
        //       .Include("~/Scripts/AngularJs/angular-route.min.js")
        //               .Include("~/Scripts/tinymce/tinymce.js")

        //       );


        bundles.Add(new Bundle("~/bundles/UIScripts")
          .Include("~/Scripts/jquery-{version}.js")
          .Include("~/js/angular.js"));

        bundles.Add(new Bundle("~/bundles/UI")
                    .Include("~/Scripts/jquery-3.1.1.min.js")
                    .Include("~/Scripts/AngularJs/angular.js")
                    .Include("~/Scripts/AngularJs/angular-route.js")
                    .Include("~/Scripts/CustomJS/custom.js")
                    .Include("~/Scripts/UI/Module.js")
                    .Include("~/Scripts/UI/home/HomeController.js")
                    .Include("~/Scripts/UI/home/HomeService.js")
                    .Include("~/Scripts/UI/project/ProjectController.js")
                    .Include("~/Scripts/UI/project/ProjectService.js")
                    .Include("~/Scripts/UI/stories/StoriesController.js")
                    .Include("~/Scripts/UI/stories/StoriesService.js")
                    .Include("~/Scripts/UI/news/newsController.js")
                    .Include("~/Scripts/UI/news/newsService.js")
                    );


            bundles.Add(new StyleBundle("~/css/all.css")
               .Include("~/font-awesome/css/font-awesome.css")
               .Include("~/css/bootstrap.css")
               .Include("~/css/sb-admin.css")
               .Include("~/css/layout.css")
               .Include("~/css/ui-grid.css")
               .Include("~/css/invoice.css")
               );

            
            bundles.Add(new ScriptBundle("~/bundles/application").Include(
                        "~/Scripts/Application/Modules/project.js",
                        "~/Scripts/Application/Modules/successStories.js",
                        "~/Scripts/Application/Modules/application.js",
                        "~/Scripts/Application/Modules/news.js",
                        "~/Scripts/Application/Controllers/imgCropperCntrl.js",
                        "~/Scripts/Application/Modules/image-crop.js",
                        "~/Scripts/Application/Controllers/CPanel.js",
                        "~/Scripts/Application/Controllers/successStoriesController.js",
                        "~/Scripts/Application/Controllers/newsController.js",
                        "~/Scripts/Application/Services/projectEntity.js",
                        "~/Scripts/Application/Services/storiesEntity.js",
                        "~/Scripts/Application/Services/newsEntity.js"
                        
                        ));


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                          "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
            //            "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
