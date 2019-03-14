app.service("newsService", function ($http) {
    const url = "api/news";
    this.getNews = function (skip, take) {
        var response = $http({
            method: "get",
            url: `${url}/updates`,
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
            url: `${url}/reports`,
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
            url: `${url}/vacancies`,
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
            url: `${url}/notices`,
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
            url: url,
            params: { id: ID  }
        });
        return response;
    }

});
