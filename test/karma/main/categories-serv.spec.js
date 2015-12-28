'use strict';

describe('module: main, service: Categories', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Categories;
  beforeEach(inject(function (_Categories_) {
    Categories = _Categories_;
  }));

  it('should do something', function () {
    expect(!!Categories).toBe(true);
  });

});
