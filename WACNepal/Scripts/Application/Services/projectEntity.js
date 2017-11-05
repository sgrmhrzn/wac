"use strict";
(function () {
    angular.module("application")
           .factory("entityService", ["akProjectService", function (akProjectService) {
               var saveTutorial = function (tutorial) {
                   return akProjectService.saveModel(tutorial, "/Projects/SaveTutorial");
               };
               var getProjects = function (skip, take, type) {
                   return akProjectService.getModel("/Projects/GetProjects", skip, take, type);
               }

               var getProject = function (prjID) {
                   return akProjectService.getProjectById(prjID, "/Projects/getProjectById");
               }

               var updateTutorial = function (id, tutorial) {
                   return akProjectService.updateModel(id, tutorial, "/Projects/UpdateProject");
               }

               var deleteRecord = function(id){
                   return akProjectService.deleteRecord(id, "/Projects/Delete");
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