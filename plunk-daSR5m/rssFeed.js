	var App = angular.module('RSSFeedApp', []);


	
	///////////
	


	
function mpgDataCtrl ($scope, $http){
	  $http.get("mpg.json")
	  .success(function(response){$scope.mpg.Date=response.records;});
}

function Ctrl2($scope){

$scope.fruits=['apples','oranges','banana']
}