app.controller("galleryController", function ($scope, $http, galleryService, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.galleries = [];

    getAll(skip, take);
    //getByID();
    $scope.getAll = function () {
       // $scope.spinner = true;
        skip = skip + 6;
        take = take + 6;
        getAll(skip, take);
    }

    function getAll(skipValue, takeValue) {
        $scope.loading = true;
        var getData = galleryService.getAll(skipValue, takeValue);
        getData.then(function (g) {
            angular.forEach(g.data, function (value, key) {
                $scope.galleries.push(value);
            })
            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }
});

app.controller("storyDetailCntrl", function ($scope, $http, $location, StoriesService, $stateParams, $window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    getSingleData();

    function getSingleData() {
        $scope.loading = true;

        var getData = StoriesService.getStory($stateParams.id);
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
