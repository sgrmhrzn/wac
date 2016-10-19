app.service("newsService", function ($http) {
    var mainObject = {};
    var action = '';

    this.addNewsObject = function (newObj) {
        mainObject = newObj;
        action = 'newsPage'
    };

    //Send object to detail controller
    this.getNewsObject = function () {
        return mainObject;
    };

    this.getAction = function () {
        return action ;
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
});
