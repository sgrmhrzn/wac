app.controller("StoriesController", function ($scope, $http, StoriesService, $window) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.stories = [];
    getAllStories(skip, take);
    $scope.getStories = function () {
        skip = skip + 6;
        take = take + 6;
        getAllStories(skip, take);
    }

    //To Get All Records  
    function getAllStories(skipValue, takeValue) {
        $scope.loading = true;
        var getData = StoriesService.getAllStories(skipValue, takeValue);
        getData.then(function (stry) {
            angular.forEach(stry.data, function (value, key) {
                $scope.stories.push(value);
            })
            $scope.loading = false;
        },function () {
            console.log('Error in getting records');
        });
    }
});
app.controller("StoryDetailController", function ($scope, $http, StoriesService, $stateParams, $window) {
    $window.scrollTo(0, 0);
    getStoryById();
    function getStoryById() {
        $scope.loading = true;
        var getData = StoriesService.getStory($stateParams.id);
        getData.then(function (stry) {
            $scope.story = stry.data;
            $scope.loading = false;
        }, function () {
            alert('Error in getting records');
        });
    }
});
