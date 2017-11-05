"use strict";
(function () {
    angular.module("application", ["ui.router", "akProjectsFactory", "akStoriesFactory", "akGalleryFactory", "akNewsFactory", "ImageCropper", "ui.tinymce", "ngSanitize"])
           .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

               $urlRouterProvider.otherwise('/CPanel');
                
               $stateProvider
                   .state("CPanel", {
                       url: '/',
                   })
               $stateProvider
                   .state("CPanelProjects", {
                   url: '/Projects',
                   templateUrl: "Templates/CPanel/Index.html",
                   controller: "CPanelCtrl"
               })
               .state("CPanelStories", {
                   url: '/Stories',
                   templateUrl: "Templates/CPanel/Success.html",
                   controller: "StoriesCntrl"
               })
               .state("CPanelNews", {
                   url: '/News',
                   templateUrl: "Templates/CPanel/News.html",
                   controller: "NewsCntrl"
               })
               .state("CPanelGallery", {
                   url: '/Gallery',
                   templateUrl: "Templates/CPanel/gallery.html",
                   controller: "galleryCtrl"
               })
               .state("login", {
                   url: '/Login',
                   templateUrl: "Templates/CPanel/login.html",
                   controller: "loginCtrl"
               })
              
        }]).directive('modal', function () {
            return {
                restrict: 'EA',
                scope: {
                    title: '=modalTitle',
                    header: '=modalHeader',
                    body: '=modalBody',
                    footer: '=modalFooter',
                    callbackbuttonleft: '&ngClickLeftButton',
                    callbackbuttonright: '&ngClickRightButton',
                    handler: '=lolo'
                },
                //templateUrl: 'partialmodal.html',
                transclude: true,
                controller: function ($scope) {
                    $scope.handler = 'pop';
                },
            };
        });

})();

