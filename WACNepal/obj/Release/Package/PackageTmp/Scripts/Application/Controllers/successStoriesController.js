"use strict";
(function () {
    angular.module("application")
           .controller("StoriesCntrl", ["$scope", "storiesEntityService",
               function ($scope, storiesEntityService) {
                   $scope.divAdd = false;
                   GetAll();

                   //To Get All Records  
                   function GetAll() {
                       $scope.loading = true;
                       var getData = storiesEntityService.getRecords();
                       getData.then(function (stry) {
                           $scope.stories = stry.data;
                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editRecord = function (story) {
                       debugger;
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
                       });
                   }

                   //update record 
                   $scope.AddUpdateRecord = function (story) {
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
                               GetAll();
                               console.log(data);
                               //alert(msg.data);
                               $scope.divAdd = false;
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = storiesEntityService.saveTutorial(story);
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
                       var getData = storiesEntityService.deleteRecord(story);
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