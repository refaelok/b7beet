'use strict';

export class NewEventController{
  constructor(NgMap){
    const ctrl = this;
    ctrl.NgMap = NgMap;
    ctrl.costumMarker = {
      lat: undefined,
      lng: undefined,
      isShown: false
    }

    NgMap.getMap().then(function(map) {
      ctrl.showCustomMarker = function(evt,object) {
        ctrl.clickedMarker = object;
        map.customMarkers[0].setVisible(true);
        map.customMarkers[0].setPosition(this.getPosition());
      };
      ctrl.closeCustomMarker = function(evt) {
        this.style.display = 'none';
      };
    });
  }

  // openCustomMarker(marker, ctrl){
  //   ctrl.costumMarker.lat = marker.latLng.lat();
  //   ctrl.costumMarker.lng = marker.latLng.lng();
  //   ctrl.costumMarker.isShown = true;
  //   console.log(ctrl.costumMarker.isShown);
  // }
  // closeMarker(oldCard){
  //   // this.costumMarker.isShown = false;
  //   this.style.display = 'none';
  //   // console.log(this.costumMarker.isShown);
  // }
  //
  markerClicked(object){
    console.log(object);
  }

  mapClicked(){
    this.costumMarker.isShown && (()=> {console.log(123); this.costumMarker.isShown = false;})()
  }


  getFamilyOrVolunteer(){
    return '123'
  }

}

export default {
  component: {
    template: require('./newEvent.html'),
    controller: ['NgMap', NewEventController],
    bindings: {
      families: '<',
      volunteers: '<'
    }
  },
  name: 'newEvent'
}
