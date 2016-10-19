"use strict";
(function () {
    angular.module("application")
           .controller("CPanelCtrl", ["$scope", "entityService",
               function ($scope, entityService) {
                   $scope.divProject = false;
                   GetAllProjects();

                   //$scope.saveTutorial = function (tutorial) {
                   //    entityService.saveTutorial(tutorial)
                   //                 .then(function (data) {
                   //                     console.log(data);
                   //                 });
                   //};

                   //To Get All Records  
                   function GetAllProjects() {
                       $scope.loading = true;
                       var getData = entityService.getProjects();
                       getData.then(function (prj) {
                           $scope.projects = prj.data;
                           $scope.loading = false;
                       }, function () {
                           alert('Error in getting records');
                       });
                   }

                   //get record by id
                   $scope.editProject = function (projects) {
                       debugger;
                       $scope.loading = true;
                       var getData = entityService.getProject(projects.id);
                       getData.then(function (prj) {
                           $scope.divProject = true;
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
                           debugger;
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
                               GetAllProjects();
                               console.log(data);
                               //alert(msg.data);
                               $scope.divProject = false;
                           }, function () {
                               alert('Error in updating record');
                           });
                       }
                       else {
                           var getData = entityService.saveTutorial(projects);
                           //console.log(projects.title, projects.base64)
                           getData.then(function (data) {
                               GetAllProjects();
                               console.log(data);
                               //alert(msg.data);
                               $scope.divProject = false;
                           }, function () {
                               alert('Error in adding record');
                           });
                       }
                       debugger;
                       GetAllProjects();
                       $scope.refresh();
                   }

                   $scope.deleteEmployee = function (project) {
                       var getData = entityService.deleteRecord(project);
                       getData.then(function (data) {
                           GetAllProjects();
                           console.log(data);
                           alert(msg.data);
                           $scope.divProject = false;
                       }, function () {
                           alert('Error in adding record');
                       });
                   }

                   $scope.AddProjectDiv = function () {
                       ClearFields();
                       $scope.Action = "Add";
                       $scope.divProject = true;
                   }

                   function ClearFields() {
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