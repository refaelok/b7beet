'use strict';

function volunteerServiceService(networkService) {
  this.getAllVolunteers = function() {
    return networkService.GET('volunteers');
  }

  this.getVolunteerById = function(id) {
    return networkService.GET('volunteers/' + id);
  }

  this.addNewVolunteer = function(volunteer) {
    return networkService.POST('volunteers', volunteer)
  }

  this.removeVolunteer = function(volunteer) {
    return networkService.DELETE('volunteers', volunteer._id)
  }

  this.updateVolunteer = function(volunteer) {
      return networkService.PUT('volunteers', volunteer._id, volunteer)
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
}

export default {
  service: ['networkService', volunteerServiceService],
  name: 'volunteerService'
}
