"use strict";
(function () {
    angular.module("application")
           .controller("StoriesCntrl", ["$scope", "storiesEntityService",
               function ($scope, storiesEntityService) {
                   var skip = 0;
                   var take = 6;
                   $scope.stories = [];

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
                       var getData = storiesEntityService.getRecords(skipValue, takeValue);
                       getData.then(function (nws) {
                           angular.forEach(nws.data, function (value, index) {
                               $scope.stories.push(value);
                           });
                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editRecord = function (story) {
                       $scope.loading = true;
                       var getData = storiesEntityService.getRecord(story.id);
                       getData.then(function (stry) {
                           $scope.divAdd = true;
                           $scope.story = stry.data;
                           $scope.story = {
                               id: story.id,
                               title: story.title,
                               description: story.description,
                               ytubeLink: story.ytubeLink,
                           }
                           $scope.loading = false;
                           $scope.Action = "Update";
                       },
                       function () {
                           alert('Error in getting records');
                           $scope.loading = false;
                       });
                   }

                   //update record 
                   $scope.AddUpdateRecord = function (story) {
                       $scope.stories = [];
                       $scope.loading = true;
                       var getAction = $scope.Action;
                       if ($scope.result != null) {
                           story.base64 = $scope.result;
                       } else
                       {
                           story.base64 = 'null';
                       }

                       if (getAction == "Update") {
                           console.log(story.base64);
                           var id = $scope.stories.id;
                           var getData = storiesEntityService.updateTutorial(id, story);
                           getData.then(function (data) {
                               GetAll(0,6);
                               alert(data);
                               $scope.loading = false;
                           }, function () {
                               alert('Error in updating record');
                               $scope.loading = false;
                           });
                       }
                       else {
                           var getData = storiesEntityService.saveTutorial(story);
                           getData.then(function (data) {
                               GetAll(0,6);
                               alert(data);
                               $scope.loading = false;
                           }, function () {
                               alert('Error in adding record');
                               $scope.loading = false;
                           });
                       }
                   }

                   $scope.deleteRecord = function (id) {
                       var getData = storiesEntityService.deleteRecord(id);
                       getData.then(function (data) {
                           alert(data);
                           $scope.stories = [];
                           GetAll(0, 6);
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.ClearFields = function () {
                       $scope.Action = "Add";
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