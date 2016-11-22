angular.module('app')
	.controller('DashboardController', ['$scope', '$filter', '$http', 'fakeData',
		function($scope, $filter, $http, fakeData ) {

		$scope.jsonData = "";

		// calues for dropdown select
		$scope.stores;
		$scope.sales;
		$scope.cards;

		// selection value
		$scope.selectStore;
		$scope.selectSale;
		$scope.selectCard;

		$scope.showSales = false;
		$scope.showStores = false;
		$scope.showCards = false;
		$scope.schema = "none";


		$scope.retrieveValues = function() {
			console.log("refresh");
			refresh();
		}

		var refresh = function() {
			$http.get("/project/stores").then(function(response) {
				$scope.stores = response.data;
				console.log(response.data);
    	});
		}

		var retrieveSales = function() {
			$http.get("/project/sales").then(function(response) {
				$scope.sales = response.data;
				console.log(response.data);
    	});
		}

		var retrieveStores = function() {
			$http.get("/project/stores").then(function(response) {
				$scope.stores = response.data;
				console.log(response.data);
    	});
		}

		var retrieveCards = function() {
			$http.get("/project/cards").then(function(response) {
				$scope.cards = response.data;
				console.log(response.data);
			});
		}

		var select = function() {

			if($scope.showSales == true) {
				$http.get("/project/sale/" + $scope.selectSale).then(function(response) {
					$scope.jsonData = response.data;
					console.log(response.data);
				});
			}
			else if($scope.showStores == false) {
				$http.get("/project/store/" + $scope.selectStore).then(function(response) {
					$scope.jsonData = response.data;
					console.log(response.data);
				});				
			}
			else if($scope.showCards == false) {
				$http.get("/project/card/" + $scope.selectCard).then(function(response) {
					$scope.jsonData = response.data;
					console.log(response.data);
				});
			}

		}

		$scope.activateSales = function() {
			$scope.showSales = true;
			$scope.showStores = false;
			$scope.showCards = false;
			$scope.schema = "sales";

			$scope.stores = retrieveSales;

			console.log("sales");
		}

		$scope.activateCards = function() {
			$scope.showSales = false;
			$scope.showStores = false;
			$scope.showCards = true;
			$scope.schema = "cards"
			console.log("cards");
		}

		$scope.activateStores = function() {
			$scope.showSales = false;
			$scope.showStores = true;
			$scope.showCards = false;
			$scope.schema = "stores";
			console.log("stores");
		}

		$scope.saveStores = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/store" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/store" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}

		$scope.saveSales = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/sale" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/sale" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}

		$scope.saveCards = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/card" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/card" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}


		$scope.addStore = function(name) {

			var jsonName = { "name": name };
			$http.post("/project/add", jsonName).then(function(response) {
				refresh();
			});
		}

		$scope.deleteStore = function() {

			$http.delete("/project/remove/" + $scope.selectStore).then(function(response) {
				refresh();
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
