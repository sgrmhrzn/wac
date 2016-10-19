app.controller("newsController", function ($scope, $http, newsService, $location, $routeParams) {
    $scope.mainLoading = true;
    getOnGoingProjects();
    getCompletedProjects();
    //getByID();
    $scope.mainLoading = false;

    function getAllNews() {
        $scope.loading = true;
        var getData = newsService.getOnGoingProjects();
        getData.then(function (prj) {
            
            $scope.ongoingProjects = prj.data;

        }, function () {
            console.log('Error in getting records');
        });
    }

    //To Get All Records  
    function getAllReport() {
        $scope.loading = true;
        var getData = newsService.getCompletedProjects();
        getData.then(function (prj) {
            $scope.completedProjects = prj.data;
            $scope.loading = false;

        },function () {
            console.log('Error in getting records');
        });
    }

    //To Get All Records  
    function getAllNotice() {
        $scope.loading = true;
        var getData = newsService.getCompletedProjects();
        getData.then(function (prj) {
            $scope.completedProjects = prj.data;
            $scope.loading = false;

        }, function () {
            console.log('Error in getting records');
        });
    }
        
    $scope.getProjectById = function getProjectById(projects) {
        debugger;
        var obj = newsService.addNewsObject(projects);
    }
});
app.controller("newsDetailCntrl", function ($scope, $http, newsService, homeService, $location, $routeParams,$window) {
    $window.scrollTo(0, 0);
    $scope.mainLoading = true;
    var newsObject2=[];
    $scope.action = newsService.getAction();
    if ($scope.action == 'newsPage') {
        $scope.transferedObject = newsService.getNewsObject();
        newsObject2.push($scope.transferedObject);
        //console.log(ProjectObject2);
    }
    else if ($scope.action == '') {
        $scope.transferedObject = homeService.getHomeObject();
        console.log($scope.transferedObject, $scope.transferedObject.title);
    }
    $scope.transferedObject.image == null ? $scope.newsImage = false : $scope.newsImage=true;
    $scope.mainLoading = false;
});
