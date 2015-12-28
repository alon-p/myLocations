'use strict';

describe('module: main, controller: CategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var CategoryCtrl;
  beforeEach(inject(function ($controller) {
    CategoryCtrl = $controller('CategoryCtrl');
  }));

  it('should do something', function () {
    expect(!!CategoryCtrl).toBe(true);
  });

});
