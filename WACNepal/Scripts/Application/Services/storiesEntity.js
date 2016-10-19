"use strict";
(function () {
    angular.module("application")
           .factory("storiesEntityService", ["akStoriesService", function (akStoriesService) {
               var saveTutorial = function (tutorial) {
                   return akStoriesService.saveModel(tutorial, "/CPanelStories/SaveStories");
               }
               var getRecords = function () {
                   return akStoriesService.getModel("/CPanelStories/getAll");
               }

               var getRecord = function (ID) {
                   return akStoriesService.getRecordById(ID, "/CPanelStories/getRecordById");
               }

               var updateTutorial = function (id, tutorial) {
                   return akStoriesService.updateModel(id, tutorial, "/CPanelStories/UpdateRecord");
               }

               var deleteRecord = function(tutorial){
                   return akStoriesService.deleteRecord(tutorial, "/CPanelStories/DeleteEmployee");
               }
               return {
                   saveTutorial: saveTutorial,
                   getRecords: getRecords,
                   getRecord: getRecord,
                   updateTutorial: updateTutorial,
                   deleteRecord: deleteRecord
               };
           }]);
})();