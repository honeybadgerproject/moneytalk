angular.module('app', [
	'ngRoute',
	'ngResource',
	'ngStorage',
	'JSONedit',
	'textAngular'
	])
	.constant('clientTokenPath', '/client-token')
	.config(['$httpProvider', function($httpProvider) {
		// $httpProvider.interceptors.push(function($q, $location,$rootScope) {
		// 	return {
		// 		response: function(response) {
		// 			return response;
		// 		},
		// 		responseError: function(response) {
		// 			console.log('Response: ' );
		// 			console.log(response);
		// 			if (response.status === 401)  {
		// 				$rootScope.message = 'You need to log in.';
		// 				$location.url('/');
		// 			}

		// 			return $q.reject(response);
		// 		}
		// 	};
		// });
	}])
	.run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
		//Review if user has been authenticated before
		Auth.init();
		$rootScope.$on('$routeChangeError', function(event, next, current) {
			if(current !== undefined)
				$location.url(current.$$route.originalPath);
			else
				$location.url('/');
		});
	  }])
	.constant('policies',{

	/*	'/repo-content': {
			templateUrl: 'angular/templates/content/repo-content.html',
			controller: 'RepoContentController'
		},
		'/header': {
			templateUrl: 'angular/templates/header.html',
			controller: 'HeaderController'
		},
		'/payment': {
			templateUrl: 'angular/templates/payment/payment.html',
			controller: 'PaymentController'
		}, */
		'/': {
			templateUrl: 'angular/templates/dashboard.html',
			controller: 'DashboardController'
		}  /*,
		'/repository/import': {
			templateUrl: 'angular/templates/repository/import.html',
			controller: 'ImportController'
		},
		'/project/:id': {
			templateUrl: 'angular/templates/project/project.html',
			controller: 'ProjectController'
		},
		'/profile': {
			templateUrl: 'angular/templates/profile/profile.html',
			controller: 'ProfileController'
		},
		'/profile/import': {
			templateUrl: 'angular/templates/profile/import.html',
			controller: 'GithubImportController'
		},
		'/profile/import/:user/:repo/:identifier': {
			templateUrl: 'angular/templates/repository/website.html',
			controller: 'RepoContentController'
		},
		'/websites/:user/:repo/:identifier': {
			templateUrl: function(params) {
        return 'websites/' + params.user + '/' + params.repo + '/' + params.identifier + '/index.html';
    	},
			controller: 'RepoContentController'
		},
		'/settings': {
      templateUrl: 'angular/templates/profile/settings.html',
      controller: 'SettingsController'
    } */
	})
	.config(['$routeProvider', 'policies', function($routeProvider, policies) {

		//Our NOT THAT complex logic for authentification and authorization validation
		var authResolver = function(path) {
		  return {
		    routingMessage : function(Auth, $q, $rootScope) {
				console.log(path)
				var deferred = $q.defer();

				Auth.userHasPermissionForView(path)
					.then(function(msg) {
						console.log(msg);
						deferred.resolve();
					}, function(msg) {
						$rootScope.message = msg;
						deferred.reject();
					});

				return deferred.promise;
			}
		  }
		};

		//Configuring Routes and Auth
		for(path in policies) {
			//Build Route
			var route = {
				templateUrl: policies[path].templateUrl,
				controller: policies[path].controller
			};

			//Sync with server about user status
			route.resolve =  authResolver(path);

			//Register route
			$routeProvider.when(path, route);
		}

		$routeProvider.otherwise({redirectTo: '/'});
	}]);
