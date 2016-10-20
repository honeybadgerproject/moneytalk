angular.module('app')
  .factory('UserService', ['$resource', function($resource) {
    var UserService = $resource('user/:userId/:action', {userId: '@id'}, {
      update: { method: 'PUT' },
      delete: { method: 'DELETE', isArray: true} ,
      projects: {
        method: 'GET',
        params: {
          userId: '@id',
          action: 'projects'
        },
        isArray: true
      },
      liked: {
        method: 'GET',
        params: {
          userId: '@id',
          action: 'liked'
        },
        isArray: true
      },
      bought: {
        method: 'GET',
        params: {
          userId: '@id',
          action: 'bought'
        },
        isArray: true
      }
    });
    return UserService;
  }]);
