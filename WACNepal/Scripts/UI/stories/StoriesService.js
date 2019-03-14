app.service("StoriesService", function ($http) {
    const url = "api/stories";

    // get Employee By Id
    this.getAllStories = function (skip, take) {
        var response = $http({
            method: "get",
            url: url,
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
            url: url,
            params: {
                id: stryID
            }
        });
        return response;
    }
});
