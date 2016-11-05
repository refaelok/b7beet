'use strict';

export class RouteDataController {
  constructor(navbarService, routeService, $stateParams, $state) {
    navbarService.disableNavbar();
    const ctrl = this;
    ctrl.route = {};
    // TODO: in case that route not found return to search page
    if($stateParams.id == 'oleg')
      $state.go('route.search')
    routeService.getRouteWithId($stateParams.id)
    .then(route => {
      ctrl.route = route;
    })
  }
}

export default {
  component: {
    template: require('./routeData.html'),
    controller: ['navbarService', 'routeService', '$stateParams', '$state', RouteDataController],
    bindings: {}
  },
  name: 'routeData'
}
