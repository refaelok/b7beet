'use strict';

describe('Component: routeData', function () {

  // load the component's module
  beforeEach(module('b7beetApp.route'));

  var routeDataComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    routeDataComponent = $componentController('routeData', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
