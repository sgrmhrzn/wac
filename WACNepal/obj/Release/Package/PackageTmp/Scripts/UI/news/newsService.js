app.service("newsService", function ($http) {

    this.getNews = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/news/getAllNews",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }

    this.getReports = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/news/getAllReports",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    this.getCareer = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/news/getAllCareers",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }
    this.getNotice = function (skip, take) {
        var response = $http({
            method: "get",
            url: "/news/getAllNotices",
            params: {
                skipNo: skip,
                takeNo: take
            }
        });
        return response;
    }

    // get projects by id
    this.getRecord = function (ID) {
        var response = $http({
            method: "get",
            url: "/news/getNewsById",
            params: { id: ID  }
        });
        return response;
    }

});
