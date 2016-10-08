'use strict';

describe('Service: eventService', function () {

  // load the service's module
  beforeEach(module('b7beetApp.event'));

  // instantiate service
  var eventService;
  beforeEach(inject(function (_eventService_) {
    eventService = _eventService_;
  }));

  it('should do something', function () {
    expect(!!eventService).to.be.true;
  });

});
