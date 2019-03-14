"use strict";
(function () {
    angular.module("application")
           .controller("galleryCtrl", ["$scope", "galleryService", "$filter",
               function ($scope, galleryService, $filter) {
                   $scope.galleries = [];
                   var skip = 0;
                   var take = 6;
                   $scope.galleries = [];

                   GetAll(skip, take);
                   //getByID();
                   $scope.GetAll = function () {
                       // $scope.spinner = true;
                       skip = skip + 6;
                       take = take + 6;
                       GetAll(skip, take);
                   }
                   //To Get All Records  
                   function GetAll(skipValue, takeValue) {
                       $scope.loading = true;
                       var getData = galleryService.getRecords(skipValue, takeValue);
                       getData.then(function (nws) {
                           angular.forEach(nws.data, function (value, index) {
                               $scope.galleries.push(value);
                           });
                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editRecord = function (gallery) {
                       debugger;
                       $scope.loading = true;
                       var getData = galleryService.getRecord(gallery.id);
                       getData.then(function (g) {
                           $scope.divAdd = true;
                           $scope.gallery = g.data;
                           $scope.gallery = {
                               id: gallery.id,
                               caption: gallery.caption,
                               ytubeLink: gallery.ytubeLink
                           }
                           $scope.loading = false;
                           $scope.Action = "Update";
                       },
                       function () {
                           alert('Error in getting records');
                       });
                   }

                   //update record 
                   $scope.AddUpdateRecord = function (gallery) {
                       $scope.loading = true;
                       debugger;
                       var getAction = $scope.Action;
                       if ($scope.result != null) {
                           gallery.base64 = $scope.result;
                       } else
                       {
                           gallery.base64 = 'null';
                       }

                       if (getAction == "Update") {
                           //console.log(New.base64);
                           var id = $scope.id;
                           var getData = galleryService.updateRecord(id, gallery);
                           getData.then(function (msg) {
                               $scope.galleries = [];
                               GetAll(skip, take);
                               alert(msg);
                               ClearFields();
                               $scope.divAdd = false;
                               $scope.loading = false;
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = galleryService.saveRecord(gallery);
                           getData.then(function (msg) {
                               $scope.galleries = [];
                               GetAll(skip, take);
                               alert(msg);
                               ClearFields();
                               $scope.divAdd = false;
                               $scope.loading = false;
                           }, function () {
                               alert('Error in adding record');
                           });
                       }
                       debugger;
                   }

                   $scope.deleteRecord = function (story) {
                       var getData = galleryService.deleteRecord(story.id);
                       getData.then(function (msg) {
                           alert(msg);
                           $scope.galleries = [];
                           GetAll(0, 6);
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.ClearFields = function () {
                       $scope.Action = "Add";
                       $scope.gallery={
                           id: "",
                           caption: "",
                           description: "",
                           ytubeLink: ""
                       }
                       $scope.clear();
                       $scope.loading = false;
                   }
                      

                   /*************image cropper******/
                   $scope.imageCropStep = 1;
                   $scope.fileChanged = function (e) {

                       var files = e.target.files;

                       var fileReader = new FileReader();

                       fileReader.readAsDataURL(files[0]);
                       fileReader.onload = function (e) {

                           $scope.imgSrc = this.result;
                           $scope.$apply();
                       };
                       $scope.result = $scope.imgSrc;

                   }

                   $scope.clear = function () {
                       $scope.imageCropStep = 1;
                       delete $scope.imgSrc;
                       delete $scope.result;
                       delete $scope.resultBlob;
                   };
                   /*************image cropper end ****************/
               }]);

})();