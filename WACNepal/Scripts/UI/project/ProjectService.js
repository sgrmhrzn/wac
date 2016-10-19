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

    //get All Eployee
    this.getCompletedProjects = function () {
        return $http.get("/Projects/CompletedProjects");
    };

    this.getOnGoingProjects = function () {
        return $http.get("/Projects/OngoingProjects")
    }

    // get Employee By Id
    this.getProject = function (prjID) {
        var response = $http({
            method: "get",
            url: "/Projects/getProjectById",
            params: {
                id: JSON.stringify(prjID)
            }
        });
        return response;
    }
});
