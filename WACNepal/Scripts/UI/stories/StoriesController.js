app.controller("StoriesController", function ($scope, $http, StoriesService) {
    getAllStories();
    $scope.tabTitle = 'Success Stories';
    //To Get All Records  
    function getAllStories() {
        $scope.loading = true;
        var getData = StoriesService.getAllStories();
        getData.then(function (stry) {
            $scope.stories = stry.data;
            $scope.loading = false;
        },function () {
            console.log('Error in getting records');
        });
    }

    $scope.getStoryById = function getStoryById(id) {
        $scope.loading = true;
        var getData = StoriesService.getStory(id);
        getData.then(function (stry) {
            $scope.story = stry.data;
            $scope.loading = false;
            console.log(story.id, story.title);

        }, function () {
            alert('Error in getting records');
        });
    }
});
