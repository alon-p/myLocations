'use strict';

describe('module: main, controller: LocationEditCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LocationEditCtrl;
  beforeEach(inject(function ($controller) {
    LocationEditCtrl = $controller('LocationEditCtrl');
  }));

  it('should do something', function () {
    expect(!!LocationEditCtrl).toBe(true);
  });

});
