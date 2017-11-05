var app = angular.module("WACNepal", ["ngSanitize", "ui.router"])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'Templates/Frontend/Home/Index.html',
            controller: 'homeController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'Templates/Frontend/Contact/Index.html',
            controller: 'homeController'
        })

    //about
    .state('about', {
        url: '/about',
    })
        .state('about.profile', {
            url: '^/whoweare/profile',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/about/profile.html',
                    controller: 'homeController'
                }
            },
        }).state('about.network', {
            url: '^/whoweare/network',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/about/network.html',
                    controller: 'homeController'
                }
            },
        }).state('about.team', {
            url: '^/whoweare/ourTeam',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/about/ourTeam.html',
                    controller: 'homeController'
                }
            },
        }).state('about.projectSummary', {
            url: '^/whoweare/projectSummary',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/about/projectSummary.html',
                    controller: 'homeController'
                }
            },
        })


     //about
    .state('ourApproach', {
        url: '/ourApproach',
    })
        .state('ourApproach.workingArea', {
            url: '^/howwework/workingArea',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/ourApproach/workingArea.html',
                    controller: 'homeController'
                }
            },
        })

        //stories
        .state('stories', {
            url: '^/stories',
            templateUrl: 'Templates/Frontend/Stories/Index.html',
            controller: 'StoriesController'
        })
        .state('stories.detail', {
            url: '^/stories/detail/:id',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/Stories/Detail.html',
                    controller: 'StoryDetailController'
                }
            },
        })


        //projects
        .state('projects', {
            url: '/projects',
        })
        .state('projects.ongoing', {
            url: '^/projects/ongoingprojects',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/Projects/Ongoing.html',
                    controller: 'ProjectController'
                }
            },
        })
        .state('projects.completed', {
            url: '^/projects/completedprojects',
            views: {
                '@': {
                    templateUrl: 'Templates/Frontend/Projects/Completed.html',
                    controller: 'ProjectController'
                }
            }
        })
    .state('projects.detail', {
        url: '^/projects/detail/:id',
        views: {
            '@': {
                templateUrl: 'Templates/Frontend/Projects/Detail.html',
                controller: 'detailCntrl'
            }
        },
    })
        //news category
        .state('news', {
            url: '^/news',
            views: {
                '@': {
                    templateUrl: '/Templates/Frontend/News/index.html'
                }
            },
        })
    .state('news.updates', {
        url: '^/news/updates',
        views: {
            '@': {
                templateUrl: '/Templates/Frontend/News/Detail.html',
                controller: 'newsDetailCntrl'
            }
        },
    })
        .state('news.career', {
            url: '^/news/career/',
            views: {
                '@': {
                    templateUrl: '/Templates/Frontend/News/Detail.html',
                    controller: ''
                }
            },
        })
        .state('noticeCareer', {
            url: '^/notice',
            views: {
                '@': {
                    templateUrl: '/Templates/Frontend/News/noticeCareer.html',
                    controller: ''
                }
            },
        })
    .state('news.detail', {
        url: '^/news/detail/:id',
        views: {
            '@': {
                templateUrl: '/Templates/Frontend/News/Detail.html',
                controller: 'newsDetailCntrl'
            }
        },
    }).state('gallery', {
        url: '^/gallery',
        views: {
            '@': {
                templateUrl: '/Templates/Frontend/gallery/index.html',
                controller: 'galleryController'
            }
        },
    })

}]).config(['$urlRouterProvider',
  function ($urlRouterProvider) {

      $urlRouterProvider.otherwise('/');
  }
]).config(["$httpProvider",
 function($httpProvider) {
     $httpProvider.interceptors.push(function() {
         return {
             "request": function(config) {
                 if (config.url && config.url.endsWith(".html")){
                     config.headers["Content-Type"] = "text/html; charset=utf-8";
                     config.headers["Accept"] = "text/html; charset=utf-8";
                 }
                 return config;
             }
         };
     });
 }]);
    //.config(function ($routeProvider, $locationProvider) {

    //    $routeProvider
    //        .when("/", {
    //            templateUrl: "Templates/Frontend/Home/Index.html",
    //            controller: "homeController"
    //        })
    //    .when("/Projects/Completed/", {
    //        templateUrl: "/Templates/Frontend/Projects/Completed.html",
    //        controller: "ProjectController"
    //    })
    //    .when("/Projects/Ongoing/", {
    //        templateUrl: "/Templates/Frontend/Projects/Ongoing.html",
    //        controller: "ProjectController"
    //    })
    //    .when("/Projects/Detail/:id", {
    //        templateUrl: "/Templates/Frontend/Projects/Detail.html",
    //        controller: "detailCntrl",
    //    })
    //    .when("/Stories/", {
    //        templateUrl: "/Templates/Frontend/Stories/Index.html",
    //        controller: "StoriesController"
    //    })
    //    .when("/News/", {
    //        templateUrl: "/Templates/Frontend/News/Index.html",
    //        controller: "newsController"
    //    })
    //    .when("/news/Detail/:id", {
    //        templateUrl: "/Templates/Frontend/News/Detail.html",
    //        controller: "newsDetailCntrl"
    //    });
    //    $locationProvider.html5Mode({
    //        enabled: true,
    //        requireBase: false
    //    })
        
    //})
//.filter('htmlToPlaintext', function () {
//    return function (text) {
//        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
//    }
//});
    
     