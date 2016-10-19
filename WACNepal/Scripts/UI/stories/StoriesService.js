app.service("StoriesService", function ($http) {

   
    this.getAllStories = function () {
        return $http.get("/Home/getAllStories")
    }

    // get Employee By Id
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
