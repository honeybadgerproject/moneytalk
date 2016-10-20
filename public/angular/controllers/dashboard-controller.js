angular.module('app')
	.controller('DashboardController', ['$scope', '$filter', 'fakeData',
		function($scope, $filter, fakeData ) {


	//	$scope.promotions = fakeData.returnStores();

		// example JSON
    $scope.jsonData =  fakeData.returnStores();

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
