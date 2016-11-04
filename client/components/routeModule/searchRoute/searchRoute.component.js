'use strict';

export class SearchRouteController {
  constructor() {
    console.log("search route")
  }
}

export default {
  component: {
    template: require('./searchRoute.html'),
    controller: [SearchRouteController],
    bindings: {}
  },
  name: 'searchRoute'
}
