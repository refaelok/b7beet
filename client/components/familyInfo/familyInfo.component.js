'use strict';

class FamilyInfoController{
  constructor(familyService, NgMap){
    const ctrl = this;
    this.NgMap = NgMap;
    this.family = familyService.getFamily();
  }

  $onInit(){
    this.NgMap.getMap({id: 'familyInfoMap'})
      .then(map => {
        google.maps.event.trigger(map, "resize");
        map.setZoom(15);
      })
  }
}

export default {
  component: {
    template: require('./familyInfo.html'),
    controller: ['familyService', 'NgMap', FamilyInfoController],
    bindings: {
      family: '<'
    }
  },
  name: 'familyInfo'
}
