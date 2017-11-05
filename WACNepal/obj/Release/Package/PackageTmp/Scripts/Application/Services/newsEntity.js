"use strict";
(function () {
    angular.module("application")
           .factory("newsEntityService", ["akNewsService", function (akNewsService) {
               var saveRecord = function (record) {
                   return akNewsService.saveModel(record, "/News/SaveNews");
               }
               var getRecords = function (skip, take, type) {
                   return akNewsService.getModel("/News/getAll", skip, take, type);
               }
               
               var getRecord = function (ID) {
                   return akNewsService.getNewsById(ID, "/News/getNewsById");
               }

               var updateRecord = function (id, tutorial) {
                   return akNewsService.updateModel(id, tutorial, "/News/UpdateNews");
               }

               var deleteRecord = function(tutorial){
                   return akNewsService.deleteRecord(tutorial, "/News/DeleteNews");
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