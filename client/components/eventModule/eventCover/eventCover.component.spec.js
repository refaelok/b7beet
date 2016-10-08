'use strict';

describe('Component: eventCover', function () {

  // load the component's module
  beforeEach(module('b7beetApp.event'));

  var eventCoverComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    eventCoverComponent = $componentController('eventCover', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
