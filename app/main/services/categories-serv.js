'use strict';
angular.module('main')
.service('Categories', function (localStorageService) {
  this.init = function () {
    this.data = JSON.parse(localStorageService.get('categories')) || [];
  }
  this.updateLS = function () {
    localStorageService.set('categories',JSON.stringify(this.data));
  };
});
