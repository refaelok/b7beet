'use strict';

describe('Component: familyList', function () {

  // load the component's module
  beforeEach(module('card'));

  var familyListComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    familyListComponent = $componentController('card', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
