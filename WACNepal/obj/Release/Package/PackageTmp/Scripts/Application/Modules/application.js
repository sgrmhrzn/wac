"use strict";
(function () {
    angular.module("application", ["ngRoute","akProjectsFactory", "akStoriesFactory", "ImageCropper","ui.tinymce"])
           .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
               $routeProvider.when("/CPanel", {
                   templateUrl: "Templates/CPanel/Index.html",
                   controller: "CPanelCtrl"
               })
               .when("/Success", {
                   templateUrl: "Templates/CPanel/Success.html",
                   controller: "StoriesCntrl"
               })
               $locationProvider.html5Mode({
                   enabled: true,
                   requireBase: false
               });
           }]);
})();

