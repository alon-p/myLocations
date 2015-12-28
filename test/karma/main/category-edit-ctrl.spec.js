'use strict';

describe('module: main, controller: CategoryEditCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var CategoryEditCtrl;
  beforeEach(inject(function ($controller) {
    CategoryEditCtrl = $controller('CategoryEditCtrl');
  }));

  it('should do something', function () {
    expect(!!CategoryEditCtrl).toBe(true);
  });

});
