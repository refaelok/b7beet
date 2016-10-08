'use strict';

function familyServiceService(networkService) {
  this.getAllFamilies = function(){
    return networkService.GET('families');
  }

  this.addNewFamily = function(family){
    return networkService.POST('families', family)
  }

  this.removeFamily = function(family){
  	return networkService.DELETE('families', family._id)
  }

  this.updateFamily = function(family){
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
  service: ['networkService', familyServiceService],
  name: 'familyService'
}
