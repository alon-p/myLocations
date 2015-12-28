'use strict';
angular.module('main')
.controller('LocationCtrl', function ($scope, $stateParams, $state,
                                      Locations,uiGmapGoogleMapApi, toastr) {
  var self = this;
  var loc = _.findWhere( Locations.data, { 'id': parseInt($stateParams.id) });
  self.name = loc.name;
  self.category = loc.category;
  self.address = loc.address;
  self.coordinates = loc.coordinates;
  var cooridnate = self.coordinates.replace(' ','').split(',')

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = {
      center: {
        latitude: cooridnate[0],
        longitude: cooridnate[1]
      },
      zoom: 10,
      marker: {
        id: Date.now(),
        coordinate: {
          latitude: cooridnate[0],
          longitude: cooridnate[1]
        }
      }
    }
  });

  $scope.trash = function () {
    var delItem = _.remove(Locations.data, function(item) {
      return item.id == parseInt($stateParams.id);
    });
    Locations.updateLS();
    toastr.success(delItem[0].name,'Deleted');
    $state.go('main.locations');
  }

  $scope.edit = function () {
    $state.go('main.editLocation',{id:$stateParams.id},{reload: true});
  };
});
