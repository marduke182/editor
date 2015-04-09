/* angular-meditor demo
 */

var app = angular.module('meditorDemo', [
  'ngRoute',
  'ngEditor'
]).config(function($routeProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    controller: 'MainCtrl'
  }).otherwise({
    redirectTo: '/'
  });

});

app.controller('MainCtrl', function($scope, $rootScope) {
  'use strict';

  var model = $scope.model = {};
  var model = $scope.model = {};
  model.text = 'anguar-meditor using ng-model.';

  var model = $scope.arrayModel = [{
    type: 'text',
    content: 'Hola mundo'
  }];
  return $rootScope.$on('$routeChangeSuccess', function() {
  });
});
