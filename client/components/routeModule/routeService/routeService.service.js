'use strict';
function routeService(networkService) {

  this.getRouteWithId = function(id){
    return networkService.GET('routes/noAuthWithRouteId/'+ id)
  }
}

export default {
  service: ['networkService', routeService],
  name: 'routeService'
}
