'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
  .state('family', {
    url: '/family',
    template: '<family></family>'
  });		
};
