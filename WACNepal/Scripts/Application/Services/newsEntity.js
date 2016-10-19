"use strict";
(function () {
    angular.module("application")
           .factory("newsEntityService", ["akNewsService", function (akNewsService) {
               var saveRecord = function (record) {
                   return akNewsService.saveModel(record, "/CPanelNews/SaveNews");
               }
               var getRecords= function () {
                   return akNewsService.getModel("/CPanelNews/getAll");
               }
               
               var getRecord = function (ID) {
                   return akNewsService.getNewsById(ID, "/CPanelNews/getNewsById");
               }

               var updateRecord = function (id, tutorial) {
                   return akNewsService.updateModel(id, tutorial, "/CPanelNews/UpdateNews");
               }

               var deleteRecord = function(tutorial){
                   return akNewsService.deleteRecord(tutorial, "/CPanelNews/DeleteNews");
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