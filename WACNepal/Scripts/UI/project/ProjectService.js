app.service("ProjectService", function ($http) {
    const url = "api/projects";
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
            url: `${url}/completed`,
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
            url: `${url}/ongoing`,
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
            url: url,
            params: {
                id: prjID
            }
        });
        return response;
    }
});
