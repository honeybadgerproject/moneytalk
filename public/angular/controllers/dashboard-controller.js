angular.module('app')
	.controller('DashboardController', ['$scope', '$filter', '$http', 'fakeData',
		function($scope, $filter, $http, fakeData ) {

		$scope.jsonData = "";
		$scope.stores = "";
		$scope.selectStore;


		$scope.retrieveStores = function() {
			console.log("refresh");
			refresh();
		}

		var refresh = function() {
			$http.get("/project/stores").then(function(response) {
				$scope.stores = response.data;
				console.log(response.data);
    	});
		}

		var select = function() {
			$http.get("/project/store/" + $scope.selectStore).then(function(response) {
				$scope.jsonData = response.data;
				console.log(response.data);
			});
		}


		$scope.save = function() {
			console.log($scope.jsonData);
			$http.put("/project/save/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				console.log(response);
				refresh();
			});
		}

		$scope.addStore = function(name) {

			var jsonName = { "name": name };
			$http.post("/project/add", jsonName).then(function(response) {
				refresh();
			});
		}

		$scope.deleteStore = function() {

			$http.post("/project/delete").then(function(response) {

				$scope.stores = response.data;
			});
		}

		$scope.$watch('selectStore', function() {
        select();
				console.log($scope.selectStore);
    });



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

		//----------------------------------//



}]);
