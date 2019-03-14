"use strict";
(function () {
    angular.module("application")
           .controller("CPanelCtrl", ["$scope", "entityService",
               function ($scope, entityService) {
                   $scope.divProject = false;
                   //To Get All Records  
                   var skip = 0;
                   var take = 6;
                   var type = "";
                   $scope.projects = [];
                   GetAllProjects(skip, take, type);

                   //getByID();
                   $scope.getProjects = function () {
                       skip = skip + 6;
                       take = take + 6;
                       GetAllProjects(skip, take, type);
                   }

                   function GetAllProjects(skipValue, takeValue, type) {
                       $scope.loading = true;
                       var getData = entityService.getProjects(skipValue, takeValue, type);
                       getData.then(function (prj) {
                           angular.forEach(prj.data, function (value, key) {
                               $scope.projects.push(value);
                           })
                           $scope.loading = false;
                       }, function () {
                           console.log('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editProject = function (projects) {
                       $scope.loading = true;
                       var getData = entityService.getProject(projects.id);
                       getData.then(function (prj) {
                           $scope.project = prj.data;
                           $scope.project = {
                               id:projects.id,
                               title: projects.title,
                               description: projects.description,
                               category: projects.category,
                               duration: projects.duration,
                               ytubeLink: projects.ytubeLink,
                               project_status: projects.project_status
                           }
                           $scope.loading = false;
                           $scope.Action = "Update";
                       },
                       function () {
                           alert('Error in getting records');
                       });
                   }

                   //update record 
                   $scope.AddUpdateProject = function (projects) {
                       var getAction = $scope.Action;
                       if ($scope.result != null) {
                           projects.base64 = $scope.result;
                       } else {
                           projects.base64 = 'null';
                       }

                       if (getAction == "Update") {
                           //var Tut = {
                           //    imagename: $scope.tutorial.imagename,
                           //    //title: $scope.tutorial.title
                           //}
                           var id = $scope.projects.id;
                           var getData = entityService.updateTutorial(id, projects);
                           getData.then(function (data) {
                               $scope.projects = [];
                               GetAllProjects(0, 6, "");
                               alert(data);
                               $scope.divProject = false;
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = entityService.saveTutorial(projects);
                           //console.log(projects.title, projects.base64)
                           getData.then(function (data) {
                               $scope.projects = [];
                               GetAllProjects(0, 6 , "");
                               alert(data);
                           }, function () {
                               alert('Error in adding record');
                           });
                       }
                   }

                   $scope.delete = function (id) {
                       var getData = entityService.deleteRecord(id);
                       getData.then(function (data) {

                           alert(data);
                           $scope.projects = [];
                           GetAllProjects(0, 6, "");
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.ClearFields = function () {
                       $scope.Action = "Add";
                       $scope.project={
                           id: "",
                           title: "",
                           description: "",
                           category: "",
                           duration: "",
                           ytubeLink: "",
                           project_status: "",
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