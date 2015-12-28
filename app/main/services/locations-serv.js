'use strict';
angular.module('main')
.service('Locations', function (localStorageService) {
  this.init = function () {
    this.data = JSON.parse(localStorageService.get('locations')) || [];
  }
  this.updateLS = function () {
    localStorageService.set('locations',JSON.stringify(this.data));
  };

});
