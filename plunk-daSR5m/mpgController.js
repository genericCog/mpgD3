angular.module('angularTable', ['angularUtils.directives.dirPagination']);

app.controller('mpgDataCtrl', function($scope, $http) {
    $http.get("mpg.json")
    .success(function (response) {$scope.mpgData = response.records;});
});

$scope.sort = function(keyname){
    $scope.sortKey = keyname;   //set the sortKey to the param passed
    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
}
