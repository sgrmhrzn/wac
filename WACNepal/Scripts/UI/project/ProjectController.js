app.controller("ProjectController", function ($scope, $http, ProjectService, $location, $routeParams, $window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    getOnGoingProjects();
    getCompletedProjects();
    //getByID();
    $scope.mainLoading = false;

    function getOnGoingProjects() {
        $scope.loading = true;
        var getData = ProjectService.getOnGoingProjects();
        getData.then(function (prj) {
            
            $scope.ongoingProjects = prj.data;

        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get All Records  
    function getCompletedProjects() {
        $scope.loading = true;
        var getData = ProjectService.getCompletedProjects();
        getData.then(function (prj) {
            $scope.completedProjects = prj.data;
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
app.controller("detailCntrl", function ($scope, $http, ProjectService, homeService, $location, $routeParams, $window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    var ProjectObject2=[];
    $scope.action = ProjectService.getAction();
    if ($scope.action == 'ProjectsPage') {
        $scope.transferedObject = ProjectService.getProjectObject();
        ProjectObject2.push($scope.transferedObject);
        //console.log(ProjectObject2);
    }
    else if ($scope.action == '') {
        $scope.transferedObject = homeService.getHomeObject();
        //console.log($scope.ProjectObject, $scope.ProjectObject.title);
    }
    $scope.mainLoading = false;
});
