app.service("ProjectService", function ($http) {
    var transferedObject = {};
    var action = '';
    this.addProjectObject = function (newObj) {
        transferedObject = newObj;
        action = 'ProjectsPage'
    };

    this.getProjectObject = function () {
        return transferedObject;
    };

    this.getAction = function () {
       return action;
    };
    this.getCompletedProjects = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/Projects/CompletedProjects",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    this.getOnGoingProjects = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/Projects/OngoingProjects",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    // get Employee By Id
    this.getProject = function (prjID) {
        var response = $http({
            method: "get",
            url: "/Projects/getProjectById",
            params: {
                id: prjID
            }
        });
        return response;
    }
});
