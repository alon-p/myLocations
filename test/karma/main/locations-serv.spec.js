'use strict';

describe('module: main, service: Locations', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Locations;
  beforeEach(inject(function (_Locations_) {
    Locations = _Locations_;
  }));

  it('should do something', function () {
    expect(!!Locations).toBe(true);
  });

});
