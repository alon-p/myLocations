'use strict';

describe('module: main, controller: CategoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var CategoriesCtrl;
  beforeEach(inject(function ($controller) {
    CategoriesCtrl = $controller('CategoriesCtrl');
  }));

  it('should do something', function () {
    expect(!!CategoriesCtrl).toBe(true);
  });

});
