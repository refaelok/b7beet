'use strict';

export class NewEventController{
  constructor(NgMap){
    const ctrl = this;
    this.showFamilies = this.showVolunteers = true;
    this.icons = {
      families: {
        shape: 'fast_rewind',
        color: 'fill: #2196F3'
      },
      volunteers: {
        shape: 'fast_forward',
        color: 'fill: #2196F3'
      }
    }
    ctrl.NgMap = NgMap;
    ctrl.costumMarker = {
      lat: undefined,
      lng: undefined,
      isShown: false
    }

    NgMap.getMap().then(function(map) {
      ctrl.showCustomMarker = function(evt,object) {
        ctrl.clickedMarker = object;
        map.showInfoWindow('foo-iw', object.id);
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


  setStatisticsClass(){
    if(this.showFamilies && this.showVolunteers) return 'col-md-6';
    else if(!this.showFamilies && !this.showVolunteers)    return 'col-md-6 col-md-offset-3';
    else if(!this.showFamilies && this.showVolunteers) return 'col-md-8 col-md-offset-1';
    else return 'col-md-9';
  }

  toggleFamilies(){
    this.showFamilies = !this.showFamilies
    if(this.showFamilies){
      this.icons.families.shape = 'fast_rewind';
      this.icons.families.color = 'fill: #2196F3';
    }
    else {
      this.icons.families.shape = 'group';
      this.icons.families.color = 'fill: #9C27B0';
    }

  }

  toggleVolunteers(){
    this.showVolunteers = !this.showVolunteers;
    if(this.showVolunteers){
       this.icons.volunteers.shape = 'fast_forward';
       this.icons.volunteers.color = 'fill: #2196F3';
     }
    else {
      this.icons.volunteers.shape = 'account_box';
      this.icons.volunteers.color = 'fill: #9C27B0';
    }
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
