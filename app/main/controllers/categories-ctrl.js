'use strict';
angular.module('main')
.controller('CategoriesCtrl', function (localStorageService,$scope, Categories,$state) {
  $scope.list = Categories.data

  $scope.go = function(id){
    $state.go('main.viewCategory',{id:id},{reload: true});
  }
});
