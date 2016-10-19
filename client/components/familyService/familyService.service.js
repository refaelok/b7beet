'use strict';

function familyServiceService(networkService, locationService) {
  this.getAllFamilies = function() {
    return networkService.GET('families')
    /*temporary*/
    .then(families => {
      let p = [];
      families.forEach(family => {
        family && family.address && !family.address.name &&
        p.push(locationService.getLocationByAddress(family.address)
              .then(location => {
                let address = {
                  name: family.address,
                  latlng: location
                }
                family.address = address
                return networkService.PUT('families', family._id, family)
              }))
      })
      return Promise.all(p).then(_ => {
        return families
      })
    })
  }

  this.getFamilyById = function(id) {
    return networkService.GET('families/' + id);
  }

  this.addNewFamily = function(family) {
    return locationService.getLocationByAddress(family.address).then(location => {
      let address = {
        name: family.address,
        latlng: location
      }
      family.address = address
      return networkService.POST('families', family)
    })
  }

  this.removeFamily = function(family) {
    return networkService.DELETE('families', family._id)
  }

  this.updateFamily = function(family) {
    return networkService.PUT('families', family._id, family)
  }

  this.setFamily = (family) => {
    this.family = family;
  }

  this.getFamily = () => {
    return this.family;
  }
}

export default {
  service: ['networkService', 'locationService', familyServiceService],
  name: 'familyService'
}
