'use strict';

export class EventCoverController{
  constructor(eventService, $state){
    const ctrl = this;
    this.$state = $state;
    this.eventService = eventService;
    
  }

}

export default {
  component: {
    template: require('./eventCover.html'),
    controller: ['eventService', '$state', EventCoverController],
    bindings: {
      details: '<'
    }
  },
  name: 'eventCover'
}
