'use strict';
angular.module('main')
.controller('NewCategoryCtrl', function ($scope,$rootScope,localStorageService,$state,Categories, title) {
  var self = this;
  self.title = title;

  self.save = function (isValid) {
    if(isValid){
      Categories.data.push(self.name);
      Categories.updateLS();
      self.name = null;
      self.CategoryForm.$setUntouched();
      $state.go('main.categories',{},{ reload: true});
    };
  };
});
