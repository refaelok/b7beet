'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';

export class EventSketchController{
  constructor(NgMap, familyService, eventService, $state, $stateParams){
    const ctrl = this;
    console.log($stateParams);
  }

}

export default {
  component: {
    template: require('./eventSketch.html'),
    controller: ['NgMap', 'familyService', 'eventService', '$state', '$stateParams', EventSketchController],
    bindings: {
    }
  },
  name: 'eventSketch'
}
