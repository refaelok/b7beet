'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';

export class NewEventController{
  constructor(NgMap, $timeout, $uibModal, familyService, eventService, $state){
    const ctrl = this;
    this.$state = $state;
    eventService.disableFabNewEvent();
    eventService.getAllFamilies()
    .then((families) => {
      this.families = families;
      return families;
    })
    .then(() => {
      return eventService.getAllVolunteers()
    })
    .then(volunteers => {
      this.volunteers = volunteers;
    })
    // this.volunteers = eventService.getAllVolunteers();
    this.familyService = familyService;
    this.eventService = eventService;
    this.$uibModal = $uibModal;
    this.$timeout = $timeout;
    this.showFamilies = this.showVolunteers = false;
    this.statisticsClass = 'col-md-6 col-md-offset-3';
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

  suggetRoutes(){
    const chosenFamilies = [];
    const chosenVolunteers = [];
    _.forEach(this.families, (family) => {
      family.checked && chosenFamilies.push(family)
    })

    _.forEach(this.volunteers, (volunteers) => {
      volunteers.checked && chosenVolunteers.push(volunteers)
    })
    this.$state.go('event.routes', {families: chosenFamilies, volunteers: chosenVolunteers})

  }

  mapClicked(){
    this.costumMarker.isShown && (()=> {console.log(123); this.costumMarker.isShown = false;})()
  }

  showFamilyDetails(family){
    this.familyService.setFamily(family);
    this.familyInfo = this.$uibModal.open({
      animation: true,
      template: '<family-info></family-info>',
      size: 'lg',
      controllerAs: '$ctrl',
      controller: familyInfo.component.controller,
      resolve: {
        family: function() {
          return family;
        }
      }
    })
  }

  updateStatisticsClass(){
      if(this.showFamilies && this.showVolunteers) this.statisticsClass = 'col-md-6';
      else if(!this.showFamilies && !this.showVolunteers)    this.statisticsClass = 'col-md-6 col-md-offset-3';
      else if(!this.showFamilies && this.showVolunteers) this.statisticsClass = 'col-md-8 col-md-offset-1';
      else this.statisticsClass = 'col-md-9';
  }

  toggleFamilies(state){
    let showFamilies = this.showFamilies = !state
    if(showFamilies){
      this.updateStatisticsClass();
    }
    else {
      this.$timeout(() => {
        this.updateStatisticsClass();
      }, 1000);
    }
  }

  toggleVolunteers(state){
    let showVolunteers = this.showVolunteers = !state;
    if(this.showVolunteers){
       this.updateStatisticsClass();
     }
    else {
      this.$timeout(() => {
        this.updateStatisticsClass();
      }, 1000);
    }
  }

  iconToggled(a){
    console.log(a);
  }
}

export default {
  component: {
    template: require('./newEvent.html'),
    controller: ['NgMap', '$timeout','$uibModal' ,'familyService', 'eventService', '$state', NewEventController],
    bindings: {
    }
  },
  name: 'newEvent'
}
