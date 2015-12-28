'use strict';

describe('module: main, controller: LocationsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LocationsCtrl;
  beforeEach(inject(function ($controller) {
    LocationsCtrl = $controller('LocationsCtrl');
  }));

  it('should do something', function () {
    expect(!!LocationsCtrl).toBe(true);
  });

});
