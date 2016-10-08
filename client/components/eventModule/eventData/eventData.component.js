'use strict';

export class EventDataController {
  constructor(eventService, $state, $stateParams) {
    const ctrl = this;
    this.$state = $state;
    this.eventService = eventService;
    let state = $state.$current.url.source.split('/').reverse()[0];
    if($stateParams.id){
      eventService.getData($stateParams.id)
      .then(this.attachEvent.call(this))
    }
    else if (state === 'current') {
      eventService.getCurrentEvent()
      .then(this.attachEvent.call(this))
    }
  }

  attachEvent(){
    const self = this;
    return function(result){
      self.event = result;
    }
  }
}

export default {
  component: {
    template: require('./eventData.html'),
    controller: ['eventService', '$state', '$stateParams', EventDataController],
    bindings: {}
  },
  name: 'eventData'
}
