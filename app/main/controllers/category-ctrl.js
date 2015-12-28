'use strict';
angular.module('main')
.controller('CategoryCtrl', function ($state,$stateParams,Categories, Locations, $scope,toastr) {
  var self = this;
  self.name = Categories.data[$stateParams.id];
  $scope.locations = _.filter(Locations.data, function(loc) {
    return loc.category == self.name;
  });


  $scope.trash = function () {
    var delItem = Categories.data.splice($stateParams.id,1);
    Categories.updateLS();
    toastr.success(delItem[0],'Deleted');
    $state.go('main.categories');
  }

  $scope.edit = function () {
    $state.go('main.editCategory',{id:$stateParams.id},{reload: true});
  };

  $scope.go = function(locationId){
    $state.go('main.viewLocation',{id:locationId},{reload: true});
  }

});
