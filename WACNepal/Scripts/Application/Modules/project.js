(function () {
    "use strict"
    angular.module("akProjectsFactory", [])
        .factory("akProjectService", ["$q", "$http",
               function ($q, $http) {
                   var getModelAsFormData = function (data) {
                       var dataAsFormData = new FormData();
                       angular.forEach(data, function (value, key) {
                           dataAsFormData.append(key, value);
                       });
                       return dataAsFormData;
                   };

                   var saveModel = function (data, url) {
                       var deferred = $q.defer();
                       $http({
                           url: url,
                           method: "POST",
                           data: getModelAsFormData(data),
                           transformRequest: angular.identity,
                           headers: { 'Content-Type': undefined }
                       }).success(function (result) {
                           deferred.resolve(result);
                       }).error(function (result, status) {
                           deferred.reject(status);
                       });
                       debugger;
                       return deferred.promise;
                   };

                   var updateModel = function (id, data, url) {
                       var deferred = $q.defer();
                       $http({
                           method: "POST",
                           url: url,
                           data: getModelAsFormData(data),
                           datatype: "JSON",
                           params: {
                               id: JSON.stringify(id)
                           },
                           transformRequest: angular.identity,
                           headers: { 'Content-Type': undefined }
                       }).success(function (result) {
                           deferred.resolve(result);
                       }).error(function (result, status) {
                           deferred.reject(status);
                       });
                       debugger;
                       return deferred.promise;
                   }
                   
                   //get All Eployee
                   var getModel = function (url, skip, take, type) {
                       var response = $http({
                           method: "get",
                           url: url,
                           params: {
                               skipNo: skip,
                               takeNo: take,
                               type: type
                           }
                       });
                       return response;
                   };
                   // get Employee By Id
                   var getProjectById = function (prjID, url) {
                       var response = $http({
                           method: "post",
                           url: url,
                           params: {
                               id: JSON.stringify(prjID)
                           }
                       });
                       return response;
                   }

                   var deleteRecord = function (id, url) {
                       var response = $http({
                           method: "post",
                           url: url,
                           params: {
                               id: id
                           },
                           transformRequest: angular.identity,
                           dataType: "json"
                         
                       }); debugger;
                       return response;
                   }
                   return {
                       saveModel: saveModel,
                       getModel: getModel,
                       getProjectById: getProjectById,
                       updateModel: updateModel,
                       deleteRecord: deleteRecord
                   }

                  

               }])
        .directive("akFileModel", ["$parse",
                function ($parse) {
                    return {
                        restrict: "A",
                        link: function (scope, element, attrs) {
                            var model = $parse(attrs.akFileModel);
                            var modelSetter = model.assign;
                            element.bind("change", function () {
                                scope.$apply(function () {
                                    modelSetter(scope, element[0].files[0]);
                                });
                            });
                        }
                    };
                }]);
})(window,document);