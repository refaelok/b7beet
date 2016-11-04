'use strict';

export class RouteDataController {
  constructor() {
    console.log("route data")
  }
}

export default {
  component: {
    template: require('./routeData.html'),
    controller: [RouteDataController],
    bindings: {}
  },
  name: 'routeData'
}
