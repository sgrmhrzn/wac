"use strict";
(function () {
    angular.module("application")
        .factory("galleryService", ["akGalleryService", function (akGalleryService) {
            const url = "/api/gallery";
            var saveRecord = function (tutorial) {
                return akGalleryService.saveModel(tutorial, url);
            }
            var getRecords = function (skip, take) {
                return akGalleryService.getModel(url, skip, take);
            }

            var getRecord = function (ID) {
                return akGalleryService.getRecordById(ID, url);
            }

            var updateRecord = function (id, tutorial) {
                return akGalleryService.updateModel(id, tutorial, url);
            }

            var deleteRecord = function (id) {
                return akGalleryService.deleteRecord(id, url);
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