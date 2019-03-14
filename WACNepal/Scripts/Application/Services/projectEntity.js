"use strict";
(function () {
    angular.module("application")
        .factory("entityService", ["akProjectService", function (akProjectService) {
            const url = "api/projects";

            var saveTutorial = function (tutorial) {
                return akProjectService.saveModel(tutorial, url);
            };
            var getProjects = function (skip, take, type) {
                return akProjectService.getModel(url, skip, take, type);
            }

            var getProject = function (prjID) {
                return akProjectService.getProjectById(prjID, url);
            }

            var updateTutorial = function (id, tutorial) {
                return akProjectService.updateModel(id, tutorial, url);
            }

            var deleteRecord = function (id) {
                return akProjectService.deleteRecord(id, url);
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