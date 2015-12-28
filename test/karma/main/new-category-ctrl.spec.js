'use strict';

describe('module: main, controller: NewCategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var NewCategoryCtrl;
  beforeEach(inject(function ($controller) {
    NewCategoryCtrl = $controller('NewCategoryCtrl');
  }));

  it('should do something', function () {
    expect(!!NewCategoryCtrl).toBe(true);
  });

});
