'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';

export class EventSketchController{
  constructor(NgMap, familyService, eventService, $state){
    const ctrl = this;
  }

}

export default {
  component: {
    template: require('./eventSketch.html'),
    controller: ['NgMap', 'familyService', 'eventService', '$state', EventSketchController],
    bindings: {
    }
  },
  name: 'eventSketch'
}
