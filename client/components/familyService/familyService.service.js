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
    console.log(family);
    return networkService.PUT('families', family._id, family)
  }
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default {
  service: ['networkService', familyServiceService],
  name: 'familyService'
}
