'use strict';

export class SearchRouteController {
  constructor(navbarService) {
    navbarService.disableNavbar();
  }

  find(){
    console.log(this);
  }
}

export default {
  component: {
    template: require('./searchRoute.html'),
    controller: ['navbarService', SearchRouteController],
    bindings: {}
  },
  name: 'searchRoute'
}
