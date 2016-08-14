'use strict';

describe('Service: familyService', function () {

  // load the service's module
  beforeEach(module('b7beetApp.family'));

  // instantiate service
  var familyService;
  beforeEach(inject(function (_familyService_) {
    familyService = _familyService_;
  }));

  it('should do something', function () {
    expect(!!familyService).to.be.true;
  });

});
