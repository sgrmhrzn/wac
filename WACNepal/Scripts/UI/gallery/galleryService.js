app.service("galleryService", function ($http) {

    this.getAll = function (skip, take) {
        var response = $http({
            method: "get",
            url: "api/gallery",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    // get Employee By Id
    this.getStory = function (ID) {
        var response = $http({
            method: "post",
            url: "/Stories/getStoryById",
            params: {
                id: ID
            }
        });
        return response;
    }
});
