"use strict";
(function () {
    angular.module("application")
           .factory("storiesEntityService", ["akStoriesService", function (akStoriesService) {
               var saveTutorial = function (tutorial) {
                   return akStoriesService.saveModel(tutorial, "/Stories/SaveStories");
               }
               var getRecords = function (skip, take) {
                   return akStoriesService.getModel("/Stories/getAllStories", skip, take);
               }

               var getRecord = function (ID) {
                   return akStoriesService.getRecordById(ID, "/Stories/getStoryById");
               }

               var updateTutorial = function (id, tutorial) {
                   return akStoriesService.updateModel(id, tutorial, "/Stories/UpdateRecord");
               }

               var deleteRecord = function(id){
                   return akStoriesService.deleteRecord(id, "/Stories/Delete");
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