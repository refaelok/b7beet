'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
  .state('event', {
    url: '/event',
    template: '<event-module></event-module>',
  })
  .state('event.new', {
    url: '/new',
    template: '<new-event></new-event>'
  })
  .state('event.list', {
    url: '/list',
    template: '<event-past-list></event-past-list>'
  })
  .state('event.current', {
    url: '/current',
    template: '<event-data></event-data>'
  })
  .state('event.upcoming', {
    url: '/upcoming',
    template: '<event-data></event-data>'
  })
  .state('event.routes', {
    url: '/routes',
    template: '<event-sketch></event-sketch>',
    params: {
      families: null,
      volunteers: null
    }
  })
  .state('event.id', {
    url: '/:id',
    template: '<event-data></event-data>'
  });
};
