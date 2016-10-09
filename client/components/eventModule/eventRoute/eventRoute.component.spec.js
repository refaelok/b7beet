'use strict';

describe('Component: eventRoute', function () {

  // load the component's module
  beforeEach(module('b7beetApp.event'));

  var newEventComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    newEventComponent = $componentController('eventRoute', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
