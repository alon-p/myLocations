'use strict';
angular.module('main')
.service('Geocoder', function ($q) {
    this.getCoordinates = function(address){
        var def = $q.defer();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
              var location = results[0].geometry.location;
              def.resolve(location);
          }  else{
              def.reject(results);
          }
      });
      return def.promise;
  };

  this.getAddress = function(coordinates){
    var latlng = {lat: parseFloat(coordinates.latitude), lng: parseFloat(coordinates.longitude)};
    var def = $q.defer();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var addressText = results[1].formatted_address
          def.resolve(addressText);
        } else {
          def.reject(results);
        }
        ;
      }
    });
    return def.promise;
  };
});
