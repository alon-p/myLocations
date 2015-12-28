'use strict';

describe('module: main, service: Geocoder', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Geocoder;
  beforeEach(inject(function (_Geocoder_) {
    Geocoder = _Geocoder_;
  }));

  it('should do something', function () {
    expect(!!Geocoder).toBe(true);
  });

});
