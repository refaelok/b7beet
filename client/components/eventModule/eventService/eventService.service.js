'use strict';

function eventService(networkService, familyService, volunteerService) {
  this.getAllVolunteers = volunteerService.getAllVolunteers;
  this.getAllFamilies = familyService.getAllFamilies;
  this.getData = function(id) {
    return networkService.GET('events/' + id)
  }
  this.getPastEvents = function() {
    return this.getEventsByState('close')
  }
  this.getCurrentEvent = function(){
    return this.getEventsByState('ongoing').then(results => {
      return results[0]
    })
  }
  this.getFeauterEvents = function(){
    return this.getEventsByState('upcoming')
  }
  this.getEventsByState = function(state) {
    return networkService.GET('events/byState/' + state)
  }
}

export default {
  service: ['networkService', 'familyService', 'volunteerService', eventService],
  name: 'eventService'
}
