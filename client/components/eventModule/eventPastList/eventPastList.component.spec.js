'use strict';

describe('Component: eventPastList', function () {

  // load the component's module
  beforeEach(module('b7beetApp.event'));

  var eventListComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    eventListComponent = $componentController('eventPastList', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
