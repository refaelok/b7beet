'use strict';

describe('Component: eventData', function () {

  // load the component's module
  beforeEach(module('b7beetApp.event'));

  var eventDataComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    eventDataComponent = $componentController('eventData', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
