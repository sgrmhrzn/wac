"use strict";
(function () {
    angular.module("application")
        .factory("newsEntityService", ["akNewsService", function (akNewsService) {
            const url = "api/news";
               var saveRecord = function (record) {
                   return akNewsService.saveModel(record, url);
               }
               var getRecords = function (skip, take, type) {
                   return akNewsService.getModel(url, skip, take, type);
               }
               
               var getRecord = function (ID) {
                   return akNewsService.getNewsById(ID, url);
               }

               var updateRecord = function (id, tutorial) {
                   return akNewsService.updateModel(id, tutorial, url);
               }

               var deleteRecord = function(tutorial){
                   return akNewsService.deleteRecord(tutorial, url);
               }
               return {
                   saveRecord: saveRecord,
                   getRecords: getRecords,
                   getRecord: getRecord,
                   updateRecord: updateRecord,
                   deleteRecord: deleteRecord
               };
           }]);
})();