'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';

export class EventRouteController{
  constructor(NgMap, familyService, eventService, $state, $stateParams){
    const ctrl = this;
    ctrl.routes = [];
    for (var i = 0; i < 50; i++) {
      ctrl.routes.push(i)
    }
  }

}

export default {
  component: {
    template: require('./eventRoute.html'),
    controller: ['NgMap', 'familyService', 'eventService', '$state', '$stateParams', EventRouteController],
    bindings: {
      data: '<'
    }
  },
  name: 'eventRoute'
}
