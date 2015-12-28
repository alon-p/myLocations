'use strict';
angular.module('main')
.controller('LocationsCtrl', function ($scope, $state, Locations, $cordovaVibration, $ionicPlatform) {

  $scope.list = Locations.data;
  $scope.enableGroup = false;
  $scope.toggleEnableGroup = function(){
    $scope.enableGroup = !$scope.enableGroup;
  }

  $scope.go = function(id){

    $ionicPlatform.ready(function() {
      if (navigator.notification){
        $cordovaVibration.vibrate(100);
      }
    });

    $state.go('main.viewLocation',{id:id},{reload: true});
  }

});
