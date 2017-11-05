app.controller("newsController", function ($scope, $http, newsService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.allNews = [];

    getAllNews(skip, take);
    $scope.getAllNews = function () {
        skip = skip + 6;
        take = take + 6;
        getAllNews(skip, take);
    }

    function getAllNews(skipValue, takeValue) {
        $scope.loading = true;
        var getData = newsService.getNews(skipValue, takeValue);
        getData.then(function (prj) {
            angular.forEach(prj.data, function (value, key) {
                $scope.allNews.push(value);
            })
            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }

})
app.controller("reportController", function ($scope, $http, newsService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.allReports = [];
    getAllReport(skip, take);

    $scope.getAllReport = function () {
        skip = skip + 6;
        take = take + 6;
        getAllReport(skip, take);
    }

    //To Get All Records  
    function getAllReport(skipValue, takeValue) {
        $scope.loading = true;
        var getData = newsService.getReports(skipValue, takeValue);
        getData.then(function (prj) {
            angular.forEach(prj.data, function (value, key) {
                $scope.allReports.push(value);
            })
            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }
})
app.controller("careerCtrl", function ($scope, $http, newsService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.allCareer = [];

    $scope.getAllCareer = function () {
        skip = skip + 6;
        take = take + 6;
        getAllCareer(skip, take);
    }
    getAllCareer(skip, take);
    //To Get All Records  
    function getAllCareer(skipValue, takeValue) {
        $scope.loading = true;
        var getData = newsService.getCareer(skipValue, takeValue);
        getData.then(function (n) {
            angular.forEach(n.data, function (value, key) {
                $scope.allCareer.push(value);
            })
            $scope.loading = false;

        }, function () {
            console.log('Error in getting records');
        });
    }
});
app.controller("noticeCtrl", function ($scope, $http, newsService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.allNotice = [];

    getAllNotice(skip, take);
    $scope.getAllNotice = function () {
        skip = skip + 6;
        take = take + 6;
        getAllNotice(skip, take);
    }
    function getAllNotice(skipValue, takeValue) {
        $scope.loading = true;
        var getData = newsService.getNotice(skipValue, takeValue);
        getData.then(function (n) {
            angular.forEach(n.data, function (value, key) {
                $scope.allNotice.push(value);
            })
            $scope.loading = false;

        }, function () {
            console.log('Error in getting records');
        });
    }
});
app.controller("newsDetailCntrl", function ($scope, $http, newsService, homeService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    getSingleData();

    function getSingleData() {
        $scope.loading = true;

        var getData = newsService.getRecord($stateParams.id);
        getData.then(function (prj) {
            $scope.transferedObject = prj.data;
            //console.log($scope.transferedObject);

            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }

    $scope.mainLoading = false;
});
