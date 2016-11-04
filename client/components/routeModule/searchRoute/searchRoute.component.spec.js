'use strict';

describe('Component: seachRoute', function () {

  // load the component's module
  beforeEach(module('b7beetApp.route'));

  var seachRouteComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    seachRouteComponent = $componentController('seachRoute', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
