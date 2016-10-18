'use strict';

describe('Component: stickyIcon', function () {

  // load the component's module
  beforeEach(module('card'));

  var stickyIconComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    stickyIconComponent = $componentController('card', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
