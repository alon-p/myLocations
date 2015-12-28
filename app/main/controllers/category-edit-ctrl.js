'use strict';
angular.module('main')
.controller('CategoryEditCtrl', function ($stateParams, Categories,$state,toastr, title) {
  this.title = title;
  this.name = Categories.data[$stateParams.id];

  this.save = function (isValid) {
    if(isValid){
      Categories.data[$stateParams.id] = this.name;
      Categories.updateLS();
      this.CategoryForm.$setUntouched();
      toastr.success(this.name,'Updated')
      $state.go('main.viewCategory',{id:$stateParams.id},{reload: true});
    }
  }
});
