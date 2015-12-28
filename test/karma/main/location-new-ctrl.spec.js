'use strict';

describe('module: main, controller: LocationNewCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LocationNewCtrl;
  beforeEach(inject(function ($controller) {
    LocationNewCtrl = $controller('LocationNewCtrl');
  }));

  it('should do something', function () {
    expect(!!LocationNewCtrl).toBe(true);
  });

});
