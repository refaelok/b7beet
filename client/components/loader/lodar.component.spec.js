'use strict';

describe('Component: familyList', function () {

  // load the component's module
  beforeEach(module('loader'));

  var familyListComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    familyListComponent = $componentController('loader', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
