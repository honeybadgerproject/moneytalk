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
			if($scope.showSales == true) {
				console.log(">>>  refresh sales");
				$http.get("/project/sales").then(function(response) {
					$scope.sales = response.data;
					console.log(response.data);
    		});
			}
			else 	if($scope.showCards == true) {
					console.log(">>>  refresh cards");
				$http.get("/project/cards").then(function(response) {
					$scope.cards = response.data;
					console.log(response.data);
				});
			}
			else if($scope.showStores == true) {
				console.log(">>>  refresh stores");
				$http.get("/project/stores").then(function(response) {
					$scope.stores = response.data;
					console.log(response.data);
    		});
			}
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
				console.log(">>>>>> select sale  " + $scope.selectSale);
				$http.get("/project/sale/" + $scope.selectSale).then(function(response) {
					$scope.jsonData = response.data;
					console.log(response.data);
				});
			}
			else if($scope.showStores == true) {
				console.log(">>>>>> select store  " + $scope.selectStore);
				$http.get("/project/store/" + $scope.selectStore).then(function(response) {
					$scope.jsonData = response.data;
					console.log(response.data);
				});
			}
			else if($scope.showCards == true) {
				console.log(">>>>>> select card  " + $scope.selectCard);
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
			$scope.selectSale = "";
			$scope.jsonData = "";
			refresh();
			console.log("sales");
		}

		$scope.activateCards = function() {
			$scope.showSales = false;
			$scope.showStores = false;
			$scope.showCards = true;
			$scope.schema = "cards"
			$scope.selectCard = "";
			$scope.jsonData = "";
			refresh();
			console.log("cards");
		}

		$scope.activateStores = function() {
			$scope.showSales = false;
			$scope.showStores = true;
			$scope.showCards = false;
			$scope.schema = "stores";
			$scope.selectStore = "";
			$scope.jsonData = "";
			refresh();
			console.log("stores");
		}

		$scope.saveStores = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/store/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/store/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}

		$scope.saveSales = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/sale/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/sale/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}

		$scope.saveCards = function() {
			console.log($scope.jsonData);

			$http.delete("/project/delete/card/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
				$http.post("/project/save/card/" + $scope.jsonData._id, $scope.jsonData).then(function(response) {
					console.log(response);
					refresh();
				});
			})

		}

		// -------------add in modal

		$scope.addStore = function(name) {

			var jsonName = { "nombr": name };
			$http.post("/project/add/store", jsonName).then(function(response) {
				refresh();
			});
		}

		$scope.addSale = function(name) {

			//var jsonName = { "name": encodeURIComponent(name).replace(/%20/g,'+') };
			var jsonName = { "nombr": name };
			$http.post("/project/add/sale", jsonName).then(function(response) {
				console.log(response);
				refresh();
			});
		}

		$scope.addCard = function(name) {

			var jsonName = { "nombr": name };
			$http.post("/project/add/card", jsonName).then(function(response) {
				refresh();
			});
		}

		//-------- delete
		$scope.deleteStore = function() {

			$http.delete("/project/remove/store/" + $scope.selectStore).then(function(response) {
				refresh();
			});
		}

		$scope.deleteCard = function() {

			$http.delete("/project/remove/card/" + $scope.selectCard).then(function(response) {
				refresh();
			});
		}

		$scope.deleteSale = function() {

			$http.delete("/project/remove/sale/" + $scope.selectSale).then(function(response) {
				refresh();
			});
		}

		$scope.$watch('selectStore', function() {
        select();
					console.log(">>>>>>>>>>  selected store" + $scope.selectStore);
    });

		$scope.$watch('selectSale', function() {
				select();
				console.log(">>>>>>>>>>  selected sale" + $scope.selectSale);
		});

		$scope.$watch('selectCard', function() {
				select();
					console.log(">>>>>>>>>>  selected Card" + $scope.selectCard);
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
