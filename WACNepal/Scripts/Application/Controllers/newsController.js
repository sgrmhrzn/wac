"use strict";
(function () {
    angular.module("application")
           .controller("NewsCntrl", ["$scope", "newsEntityService","$filter",
               function ($scope, newsEntityService, $filter) {

                   $scope.divAdd = false;
                   GetAll();

                   //To Get All Records  
                   function GetAll() {
                       $scope.loading = true;
                       var getData = newsEntityService.getRecords();
                       getData.then(function (nws) {
                           $scope.news = nws.data;
                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editRecord = function (New) {
                       debugger;
                       $scope.loading = true;
                       var getData = newsEntityService.getRecord(New.id);
                       getData.then(function (nws) {
                           $scope.divAdd = true;
                           $scope.New = nws.data;
                           $scope.New = {
                               id: New.id,
                               title: New.title,
                               detail: New.detail,
                               ytubeLink: New.ytubeLink,
                               eventDate: $filter('date')(New.eventDate.slice(6, -2), "yyyy-MM-dd"),
                               news_type: New.news_type
                           }
                           $scope.loading = false;
                           $scope.Action = "Update";
                       },
                       function () {
                           alert('Error in getting records');
                       });
                   }

                   //update record 
                   $scope.AddUpdateRecord = function (New) {
                       console.log($scope.New.eventDate);

                       debugger;

                       var getAction = $scope.Action;
                       if ($scope.result != null) {
                           New.base64 = $scope.result;
                       } else
                       {
                           New.base64 = 'null';
                       }

                       if (getAction == "Update") {
                           //console.log(New.base64);
                           var id = $scope.news.id;
                           var getData = newsEntityService.updateRecord(id, New);
                           getData.then(function (data) {
                               GetAll();
                               console.log(data);
                               //alert(data);
                               $scope.divAdd = false;
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = newsEntityService.saveRecord(New);
                           getData.then(function (data) {
                               GetAll();
                               console.log(data);
                               //alert(msg.data);
                               $scope.divAdd = false;
                           }, function () {
                               alert('Error in adding record');
                           });
                       }
                       debugger;
                       GetAll();
                       //$scope.refresh();
                   }

                   $scope.deleteRecord = function (story) {
                       var getData = newsEntityService.deleteRecord(story);
                       getData.then(function (data) {
                           GetAll();
                           console.log(data);
                           alert(msg.data);
                           $scope.divAdd = false;
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.AddDiv = function () {
                       ClearFields();
                       $scope.Action = "Add";
                       $scope.divAdd = true;
                   }
                   function ClearFields() {
                       $scope.story={
                           id: "",
                           title: "",
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