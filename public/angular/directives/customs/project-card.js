angular.module('app')
	.directive('projectcard', function() {
		return {
			restrict: 'AE',
			templateUrl: 'angular/templates/directives/customs/project-card.html',
			replace: true,
			transclude: true,
			scope: {
				project: '='
			},
      controller: function($scope){

      }
    }
  });
