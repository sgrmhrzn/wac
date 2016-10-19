var app = angular.module("WACNepal", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "Templates/Frontend/Home/Index.html",
                controller: "homeController"
            })
        .when("/Projects/Completed/", {
            templateUrl: "/Templates/Frontend/Projects/Completed.html",
            controller: "ProjectController"
        })
        .when("/Projects/Ongoing/", {
            templateUrl: "/Templates/Frontend/Projects/Ongoing.html",
            controller: "ProjectController"
        })
        .when("/Projects/Detail/:id", {
            templateUrl: "/Templates/Frontend/Projects/Detail.html",
            controller: "detailCntrl",
        })
        .when("/Stories/", {
            templateUrl: "/Templates/Frontend/Stories/Index.html",
            controller: "StoriesController"
        })
        .when("/News/", {
            templateUrl: "/Templates/Frontend/News/Index.html",
            controller: "newsController"
        })
        .when("/news/Detail/:id", {
            templateUrl: "/Templates/Frontend/News/Detail.html",
            controller: "newsDetailCntrl"
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        })
        
    })
.filter('htmlToPlaintext', function () {
    return function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
});
    
     