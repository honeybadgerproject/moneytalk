angular.module('app')
.factory('Socket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);
