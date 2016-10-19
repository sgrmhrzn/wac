app.service("homeService", function ($http) {
    var transferedObject = {};
    var action = '';

    this.addHomeObject = function (newObj) {
        transferedObject = newObj;
    };

    //Send object to detail controller
    this.getHomeObject = function () {
        return transferedObject;
    };

    this.getAction = function () {
        return action = 'HomePage';
    };
    //get All CompletedProjects
    this.getCompletedProjects = function () {
        return $http.get("/Home/CompletedProjects");
    };

    //get All OnGoingProjects
    this.getOnGoingProjects = function () {
        return $http.get("/Home/OngoingProjects")
    }

    // get projects by id
    this.getProject = function (prjID) {
        var response = $http({
            method: "get",
            url: "/Home/getProjectById",
            params: {
                id: JSON.stringify(prjID)
            }
        });
        return response;
    }


    // get all Stories
    this.getAllStories = function () {
        return $http.get("/Home/getAllStories")
    }

    // get Stories by id
    this.getStory = function (stryID) {
        var response = $http({
            method: "post",
            url: "/Home/getStoryById",
            params: {
                id: JSON.stringify(stryID)
            }
        });
        return response;
    }

    // get all News
    this.getAllNews = function () {
        return $http.get("/Home/getAllNews")
    }

    // get News by id
    this.getNewsById = function (ID) {
        var response = $http({
            method: "post",
            url: "/Home/getNewsById",
            params: {
                id: JSON.stringify(ID)
            }
        });
        return response;
    }
});
