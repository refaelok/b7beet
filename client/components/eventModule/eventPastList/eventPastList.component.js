'use strict';

export class EventPastListController {
  constructor(eventService, $state) {
    const ctrl = this;
    this.$state = $state;
    this.eventService = eventService;
    eventService.enableFabNewEvent();
    eventService.getPastEvents()
    .then(events => {
      this.eventList = events;
    })
  }

  showEventData(event) {
    this.$state.go('event.id', {'id': event._id})
  }

}

export default {
  component: {
    template: require('./eventPastList.html'),
    controller: ['eventService', '$state', EventPastListController],
    bindings: {}
  },
  name: 'eventPastList'
}
