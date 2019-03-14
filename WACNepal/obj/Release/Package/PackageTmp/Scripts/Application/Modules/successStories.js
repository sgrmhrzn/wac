(function () {
    "use strict"
    angular.module("akStoriesFactory", [])
        .factory("akStoriesService", ["$q", "$http",
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
                           data: data,
                           headers: { 'Content-Type': 'application/json' }
                       }).success(function (result) {
                           deferred.resolve(result);
                       }).error(function (result, status) {
                           deferred.reject(status);
                       });
                       return deferred.promise;
                   };

                   var updateModel = function (id, data, url) {
                       var deferred = $q.defer();
                       $http({
                           method: "POST",
                           url: url,
                           data: data,
                           datatype: "JSON",
                           params: {
                               id: JSON.stringify(id)
                           },
                           headers: { 'Content-Type': 'application/json' }
                       }).success(function (result) {
                           deferred.resolve(result);
                       }).error(function (result, status) {
                           deferred.reject(status);
                       });
                       return deferred.promise;
                   }
                   
                   //get All Eployee
                   var getModel = function (url, skip, take) {
                       var response = $http({
                           method: "get",
                           url: url,
                           params: {
                               skipNo: skip,
                               takeNo: take,
                           }
                       });
                       return response;
                   };

                   // get Employee By Id
                   var getRecordById = function (ID, url) {
                       var response = $http({
                           method: "get",
                           url: url,
                           params: {
                               id: JSON.stringify(ID)
                           }
                       });
                       return response;
                   }

                   var deleteRecord = function (id, url) {
                       var response = $http({
                           method: "delete",
                           url: url,
                           params: {
                               id: id
                           },
                           dataType: "json"

                       }); 
                       return response;
                   }
                   return {
                       saveModel: saveModel,
                       getModel: getModel,
                       getRecordById: getRecordById,
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