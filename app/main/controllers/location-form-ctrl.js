'use strict';
angular.module('main')
.controller('LocationFormCtrl', function ($scope, $state, $stateParams, title, action, Categories,
                                         Locations, uiGmapGoogleMapApi, Geocoder) {
  var coordiantesPattern = /(\d*\.?\d*),\s(\d*\.?\d*)/;
  var self = this;
  self.title = title;
  $scope.categories = Categories.data;
  var editing = (action == 'edit');
  if (editing){
    var loc = _.findWhere( Locations.data, { 'id': parseInt($stateParams.id) });
    self.id = loc.id;
    self.name = loc.name;
    self.address = loc.address;
    self.category = loc.category;
    self.coordinates = loc.coordinates;
    var cooridnate = self.coordinates.replace(' ','').split(',')
    self.editCooridnate = {
      latitude: cooridnate[0],
      longitude: cooridnate[1],
    }
  }

  uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = {
          center: {
                latitude: 32.5,
                longitude: 34.9
            },
            zoom: 10 ,
            marker: null,
            events: {
                click: function(map, eventName, originalEventArgs) {
                  var e = originalEventArgs[0];
                  var coordinate = {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng()
                  };
                  placeMarker(coordinate);
                  setCoordinatesInput(coordinate);
                  setAddressInput(coordinate);
                  $scope.$apply();
                }
            }
        };
    if(editing){
      placeMarker(self.editCooridnate);
    }
  });

  function placeMarker(coordinate){
    var marker = {
      id: Date.now(),
      coordinate: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      }
    };
    $scope.map.marker = marker;
    $scope.map.center = coordinate;
  };

  function setCoordinatesInput(coordinate){
    self.coordinates = coordinate.latitude.toString() + ', ' + coordinate.longitude.toString();
  }

  function setAddressInput(coordinate){
    Geocoder.getAddress(coordinate)
      .then(function(address){
        self.address = address;
      });
  }




  self.coordinatesChange = function(){
      if(self.coordinates){
          var search = self.coordinates.match(coordiantesPattern);
          if (search!=null){
              var lat = search[1];
              var lon = search[2];
              var coordinate = {
                  latitude: lat,
                  longitude: lon
              }
              placeMarker(coordinate)
              setAddressInput(coordinate)
          };
      };
  };

  self.addressChange = function () {
    if (self.address){
      Geocoder.getCoordinates(self.address)
        .then(function (data) {
          var coordinate = {
            latitude: data.lat(),
            longitude: data.lng()
          }
          setCoordinatesInput(coordinate)
          placeMarker(coordinate)
        });
    };
  };

  $scope.save = function (isValid) {
      var lastIndex = Locations.data[Locations.data.length-1];
      if(_.has(lastIndex,'id')){
        lastIndex = parseInt(lastIndex.id);
      } else {
        lastIndex = 0;
      }
      if(isValid){
        var locationData = {
            id: (editing)?self.id : lastIndex + 1,
            name: self.name,
            address: self.address,
            coordinates: self.coordinates,
            category: self.category
        }
        if(editing==true) {
          var toUpdateLoc = _.findWhere(Locations.data, {'id': parseInt($stateParams.id)});
          var oldItem = _.remove(Locations.data, function (item) {
            return item.id == parseInt($stateParams.id);
          });
        }
        Locations.data.push(locationData);
        Locations.updateLS();

        self.name = null;
        self.address = null;
        self.coordinates = null;
        self.LocationForm.$setUntouched();

        $state.go('main.locations',{},{ reload: true});
        }
    }


});
