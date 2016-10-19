"use strict";
(function () {
    angular.module("application")
           .factory("entityService", ["akProjectService", function (akProjectService) {
               var saveTutorial = function (tutorial) {
                   return akProjectService.saveModel(tutorial, "/CPanel/SaveTutorial");
               };
               var getProjects = function () {
                   return akProjectService.getModel("/CPanel/GetAll");
               }

               var getProject = function (prjID) {
                   return akProjectService.getProjectById(prjID, "/CPanel/getProjectById");
               }

               var updateTutorial = function (id, tutorial) {
                   return akProjectService.updateModel(id, tutorial, "/CPanel/UpdateProject");
               }

               var deleteRecord = function(tutorial){
                   return akProjectService.deleteRecord(tutorial, "/CPanel/DeleteEmployee");
               }
               return {
                   saveTutorial: saveTutorial,
                   getProjects: getProjects,
                   getProject: getProject,
                   updateTutorial: updateTutorial,
                   deleteRecord: deleteRecord
               };
           }]);
})();