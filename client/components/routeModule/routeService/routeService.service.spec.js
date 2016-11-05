.'use strict';

describe('Service: routeService', function () {

  // load the service's module
  beforeEach(module('b7beetApp.route'));

  // instantiate service
  var routeService;
  beforeEach(inject(function (_routeService_) {
    routeService = _routeService_;
  }));

  it('should do something', function () {
    expect(!!routeService).to.be.true;
  });

});
