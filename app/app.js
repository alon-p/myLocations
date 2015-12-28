'use strict';
angular.module('myLocations', [
  // load your modules here
  'main', // starting with the main module
])
  .run(function ($rootScope, $ionicHistory, $state, Categories, Locations) {
    $ionicHistory.clearHistory();
    Categories.init();
    Locations.init();
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      if (next === current) {
        event.preventDefault();
        $state.go('main.locations');
      }
    });
  });
