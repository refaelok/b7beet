'use strict';

export class NewEventController{
  constructor(){
    const ctrl = this;
    ctrl.costumMarker = {
      lat: undefined,
      lng: undefined,
      isShown: false
    }
  }

  test(){
  }

  openCustomMarker(marker, ctrl){
    ctrl.costumMarker.lat = marker.latLng.lat();
    ctrl.costumMarker.lng = marker.latLng.lng();
    ctrl.costumMarker.isShown = true;
  }

  closeCustomMarker(marker, ctrl){
    console.log(ctrl);
    ctrl.costumMarker.isShown = false;
  }

  mapClicked(){
    console.log(this.costumMarker.isShown);
    this.costumMarker.isShown && (()=> {console.log(123); this.costumMarker.isShown = false;})()
  }

}

export default {
  component: {
    template: require('./newEvent.html'),
    controller: [NewEventController],
    bindings: {
      families: '<',
      volunteers: '<'
    }
  },
  name: 'newEvent'
}
