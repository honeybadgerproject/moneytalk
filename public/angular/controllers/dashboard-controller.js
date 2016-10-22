angular.module('app')
	.controller('DashboardController', ['$scope', '$filter', '$http', 'fakeData',
		function($scope, $filter, $http, fakeData ) {

		$scope.jsonData = "";

		$scope.retrieveStores = function() {

			$http.get("/project/stores").then(function(response) {
				console.log(response.data);
					$scope.jsonData = response.data;
    	});
		}



		$scope.save = function() {
			console.log($scope.jsonData);
			$http.post("/project/save", $scope.jsonData).then(function(response) {
				console.log(response);
			});
		}



    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);



}]);
