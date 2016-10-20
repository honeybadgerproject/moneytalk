angular.module('app')
	.directive('infofooter', function() {
		return {
			restrict: 'AE',
			templateUrl: 'angular/templates/directives/customs/project-info-footer.html',
			replace: true,
			transclude: true,
			scope: {
				project: '='
			},
      controller: function($scope) {

      }
    }
  });
