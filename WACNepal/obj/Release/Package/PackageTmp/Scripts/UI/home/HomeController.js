app.controller("homeController", function ($scope, $http, homeService, $location, $routeParams) {
    $scope.mainLoading = true;
    getAllStories();
    getOnGoingProjects();
    getCompletedProjects();
    $scope.mainLoading = false;

    //To Get All ongoing Projects 
    function getOnGoingProjects() {
        $scope.loading = true;
        var getData = homeService.getOnGoingProjects();
        getData.then(function (prj) {
            
            $scope.ongoingProjects = prj.data;

        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get All completed Projects 
    function getCompletedProjects() {
        $scope.loading = true;
        var getData = homeService.getCompletedProjects();
        getData.then(function (prj) {
            $scope.completedProjects = prj.data;
            $scope.loading = false;

        },function () {
            console.log('Error in getting records');
        });
    }
        
    //To Get All Project by id
    $scope.getProjectById = function getProjectById(projects) {
        debugger;
        homeService.addProjectObject(projects);
    }


    /**/
    //To Get All Stories  
    function getAllStories() {
        $scope.loading = true;
        var getData = homeService.getAllStories();
        getData.then(function (stry) {
            $scope.stories = stry.data;
            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get Story by Id
    $scope.getStoryById = function getStoryById(id) {
        $scope.loading = true;
        var getData = homeService.getStory(id);
        getData.then(function (stry) {
            $scope.story = stry.data;
            $scope.loading = false;
            console.log(story.id, story.title);

        }, function () {
            alert('Error in getting records');
        });
    }

});
