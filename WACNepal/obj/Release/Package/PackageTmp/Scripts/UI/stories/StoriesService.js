app.service("StoriesService", function ($http) {

   
    // get Employee By Id
    this.getAllStories = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/Stories/getAllStories",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    // get Employee By Id
    this.getStory = function (stryID) {
        var response = $http({
            method: "get",
            url: "/Stories/getStoryById",
            params: {
                id: stryID
            }
        });
        return response;
    }
});
