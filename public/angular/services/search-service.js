angular.module('app')
	.factory('SearchService', ['$resource', function($resource) {
	        var Search = $resource('search/:action', {}, {
            mostLiked: {
              method: 'GET',
              params: {
                action: 'most-liked'
              },
              isArray: true
            },
            mostWanted: {
              method: 'GET',
              params: {
                action: 'most-wanted'
              },
              isArray: true
            }
					});

	        return Search;
	    }]);
