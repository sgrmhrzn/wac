"use strict";
(function () {
    angular.module("application", ["ngRoute", "akProjectsFactory", "akStoriesFactory", "akNewsFactory", "ImageCropper", "ui.tinymce"])
           .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
               $routeProvider.when("/CPanel", {
                   templateUrl: "Templates/CPanel/",
                   controller: "CPanelCtrl"
               })
               .when("/CPanelStories", {
                   templateUrl: "Templates/CPanel/Success.html",
                   controller: "StoriesCntrl"
               })
               .when("/CPanelNews", {
                   templateUrl: "Templates/CPanel/News.html",
                   controller: "NewsCntrl"
               })
               $locationProvider.html5Mode({
                   enabled: true,
                   requireBase: false
               });
           }]);
})();

