﻿app.controller("homeController", function ($scope, $http, homeService, $location, $routeParams) {
    $scope.mainLoading = true;
    getAllStories();
    getOnGoingProjects();
    getCompletedProjects();
    getAllNews();
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
        homeService.addHomeObject(projects);
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
        var getData = homeService.getNewsById(id);
        getData.then(function (nws) {
            $scope.New = nws.data;
            $scope.loading = false;
            console.log(New.id, New.title);

        }, function () {
            alert('Error in getting records');
        });
    }

    //To Get All News 
    function getAllNews() {
        $scope.loading = true;
        var getData = homeService.getAllNews();
        getData.then(function (nws) {

            $scope.homeNews = nws.data;

        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get All news by id
    $scope.getNewsById = function getNewsById(news) {
        debugger;
        homeService.addHomeObject(news);
    }
});
