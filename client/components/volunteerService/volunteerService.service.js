'use strict';

function volunteerServiceService(networkService, locationService) {
  this.getAllVolunteers = function() {
    return networkService.GET('volunteers');
  }

  this.getVolunteerById = function(id) {
    return networkService.GET('volunteers/' + id);
  }

  this.addNewVolunteer = function(volunteer) {
    return locationService.getLocationByAddress(volunteer.address).then(location => {
      let address = {
        name: volunteer.address,
        latlng: location
      }
      volunteer.address = address
      return networkService.POST('volunteers', volunteer)
    })
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
  service: ['networkService', 'locationService', volunteerServiceService],
  name: 'volunteerService'
}
