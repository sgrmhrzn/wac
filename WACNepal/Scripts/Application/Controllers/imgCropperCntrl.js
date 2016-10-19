"use strict";
(function () {
    angular.module("application")
           .controller('imgCropper', ['$scope', function ($scope) {
               $scope.imageCropStep = 1;
               $scope.fileChanged = function (e) {

                   var files = e.target.files;

                   var fileReader = new FileReader();
                   fileReader.readAsDataURL(files[0]);

                   fileReader.onload = function (e) {
                       $scope.imgSrc = this.result;
                       $scope.$apply();
                   };
                   

               }

               $scope.clear = function () {
                   $scope.imageCropStep = 1;
                   delete $scope.imgSrc;
                   delete $scope.result;
                   delete $scope.resultBlob;
               };

           }]);

})();
