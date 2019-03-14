"use strict";
(function () {
    angular.module("application")
        .factory("storiesEntityService", ["akStoriesService", function (akStoriesService) {
            const url = "api/stories";

            var saveTutorial = function (tutorial) {
                return akStoriesService.saveModel(tutorial, url);
            }
            var getRecords = function (skip, take) {
                return akStoriesService.getModel(url, skip, take);
            }

            var getRecord = function (ID) {
                return akStoriesService.getRecordById(ID, url);
            }

            var updateTutorial = function (id, tutorial) {
                return akStoriesService.updateModel(id, tutorial, url);
            }

            var deleteRecord = function (id) {
                return akStoriesService.deleteRecord(id, url);
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