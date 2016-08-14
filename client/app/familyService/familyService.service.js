'use strict';

function familyServiceService(networkService) {
  this.getAllFamilies = function(){
    return networkService.GET('families');
  }

  this.addNewFamily = function(family){
    return networkService.POST('families', family)
  }
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default {
  service: ['networkService', familyServiceService],
  name: 'familyService'
}
