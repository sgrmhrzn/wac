"use strict";
(function () {
    angular.module("application")
           .factory("galleryService", ["akGalleryService", function (akGalleryService) {
               var saveRecord = function (tutorial) {
                   return akGalleryService.saveModel(tutorial, "/Gallery/SaveGallery");
               }
               var getRecords = function (skip, take) {
                   return akGalleryService.getModel("/Gallery/GetAll", skip, take);
               }

               var getRecord = function (ID) {
                   return akGalleryService.getRecordById(ID, "/Gallery/GetById");
               }

               var updateRecord = function (id, tutorial) {
                   return akGalleryService.updateModel(id, tutorial, "/Gallery/Update");
               }

               var deleteRecord = function(id){
                   return akGalleryService.deleteRecord(id, "/Gallery/Delete");
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