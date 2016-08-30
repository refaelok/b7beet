'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
  .state('event', {
    url: '/event',
    template: '<event></event>'
  })
  .state('event/:id', {
    url: '/event/:id',
    template: ':id'
  })
  .state('newEvent', {
    url: '/event/new',
    template: 'newEvent'
  });
};
