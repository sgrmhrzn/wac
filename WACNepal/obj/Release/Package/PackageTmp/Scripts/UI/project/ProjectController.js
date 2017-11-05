app.controller("ProjectController", function ($scope, $http, ProjectService, $location, $stateParams,  $window, $state) {
    $window.scrollTo(0, 0);
    var skip = 0;
    var take = 6;
    $scope.ongoingProjects = [];
    $scope.completedProjects = [];
    $state.current.name == "projects.ongoing" ? getOnGoingProjects(skip, take) : getCompletedProjects(skip, take);
    $scope.mainLoading = true;
    
    
    //getByID();
    $scope.getProjects = function () {
        $scope.spinner = true;
        skip = skip + 6;
        take = take + 6;
        $state.current.name == "projects.ongoing" ? getOnGoingProjects(skip, take) : getCompletedProjects(skip, take);
    }

    function getOnGoingProjects(skipValue,takeValue) {
        $scope.loading = true;
        var getData = ProjectService.getOnGoingProjects(skipValue, takeValue);
        getData.then(function (prj) {
            angular.forEach(prj.data, function (value, key) {
                $scope.ongoingProjects.push(value);
            })
            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get All Records  
    function getCompletedProjects(skipValue, takeValue) {
        $scope.loading = true;
        var getData = ProjectService.getCompletedProjects(skipValue, takeValue);
        getData.then(function (prj) {
            angular.forEach(prj.data, function (value, key) {
                $scope.completedProjects.push(value);
            })
            $scope.loading = false;
        },function () {
            console.log('Error in getting records');
        });
    }
        
    $scope.getProjectById = function getProjectById(projects) {
        debugger;
        var obj = ProjectService.addProjectObject(projects);
    }
});
app.controller("detailCntrl", function ($scope, $http, ProjectService, homeService, $location, $stateParams, $window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    getSingleData();

    function getSingleData() {
        $scope.loading = true;

        var getData = ProjectService.getProject($stateParams.id);
        getData.then(function (prj) {
            $scope.transferedObject = prj.data;
            console.log($scope.transferedObject);

            $scope.loading = false;
        }, function () {
            console.log('Error in getting records');
        });
    }

    $scope.mainLoading = false;
});
