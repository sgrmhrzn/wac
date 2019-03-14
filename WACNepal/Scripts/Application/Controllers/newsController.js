"use strict";
(function () {
    angular.module("application")
           .controller("NewsCntrl", ["$scope", "newsEntityService","$filter",
               function ($scope, newsEntityService, $filter) {
                   $scope.galleries = [];
                   var skip = 0;
                   var take = 6;
                   var type = "";
                   $scope.news = [];
                   GetAll(skip, take, type);
                   //getByID();
                   $scope.GetAll = function () {
                       // $scope.spinner = true;
                       skip = skip + 6;
                       take = take + 6;
                       GetAll(skip, take);
                   }
                   //To Get All Records  
                   function GetAll(skipValue, takeValue, typeValue) {
                       $scope.loading = true;
                       var getData = newsEntityService.getRecords(skipValue, takeValue, typeValue);
                       getData.then(function (nws) {
                           angular.forEach(nws.data, function (value, index) {
                               $scope.news.push(value);
                           });

                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editRecord = function (New) {
                       $scope.loading = true;
                       var getData = newsEntityService.getRecord(New.id);
                       getData.then(function (nws) {
                           $scope.New = nws.data;
                           $scope.New = {
                               id: New.id,
                               title: New.title,
                               detail: New.detail,
                               ytubeLink: New.ytubeLink,
                               dateOfEvent: new Date($filter('date')(New.eventDate.slice(6, -2), "dd/MM/yyyy")),
                               news_type: New.news_type,
                               
                           }
                           $scope.Action = "Update";
                           $scope.loading = false;
                       },
                       function () {
                           alert('Error in getting records');
                       });
                   }

                   //update record 
                   $scope.AddUpdateRecord = function (New) {
                       console.log();
                       $scope.New.eventDate = $filter('date')(New.dateOfEvent, "yyyy-MM-dd");
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
                               $scope.news = [];
                               GetAll(0, 6, "");
                               alert(data);
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = newsEntityService.saveRecord(New);
                           getData.then(function (data) {
                               $scope.news = [];
                               GetAll(0, 6, "");
                               alert(data);
                           }, function () {
                               alert('Error in adding record');
                           });
                       }
                   }

                   $scope.deleteRecord = function (id) {
                       var getData = newsEntityService.deleteRecord(id);
                       getData.then(function (data) {
                           $scope.news = [];
                           GetAll(0, 6, "");
                           alert(data);
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.ClearFields = function () {
                       $scope.Action = "Add";
                       $scope.New={
                           id: "",
                           title: "",
                           detail: "",
                           ytubeLink: "",
                           news_type: "",
                           dateOfEvent:""
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