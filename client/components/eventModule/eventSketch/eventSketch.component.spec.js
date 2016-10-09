'use strict';

describe('Component: newEvent', function () {

  // load the component's module
  beforeEach(module('b7beetApp.event'));

  var newEventComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    newEventComponent = $componentController('newEvent', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
