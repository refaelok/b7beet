'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';
const wayPointTmpl = {
  location: {
    lat: null,
    lng: null
  },
  stopover: true
};
const emptyRoute = {
  families: [],
  volunteers: []
}

export class EventSketchController {
  constructor(NgMap, familyService, eventService, $state, $stateParams, $timeout, Notification, $scope, socket) {
    const ctrl = this;
    ctrl.icons = {
      families: {
        shape: 'fast_rewind',
        color: 'fill: #2196F3'
      },
      volunteers: {
        shape: 'fast_forward',
        color: 'fill: #2196F3'
      }
    }
    ctrl.isLoading = true; //change to true
    ctrl.routes = [];
    ctrl.model = {};
    ctrl.socket = socket;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('events');
    });
    ctrl.selectedRoute = null;
    ctrl.model.map = {
      travelMode: 'DRIVING',
      wayPoints: [],
      origin: '31.2539446,34.7925381',
      destination: null,
      center: [31.2509633, 34.7953221]
    }
    ctrl.$timeout = $timeout;
    ctrl.Notification = Notification;
    ctrl.showDetailsAboutRoute = false;
    eventService.disableFabNewEvent();
    ctrl.eventService = eventService;
    ctrl.showFamilies = ctrl.showVolunteers = false;
    ctrl.routesClass = 'col-md-8 col-md-offset-2';
    ctrl.nonAttachhedFamilies = [];
    ctrl.nonAttachedVolunteers = [];
    ctrl.families = $stateParams.families;
    ctrl.volunteers = $stateParams.volunteers;

    if (!$stateParams.families || !$stateParams.volunteers || $stateParams.families.length == 0 || $stateParams.volunteers.length == 0) {
      eventService.getSketchEvent()
        .then(sketch => {
          if(!sketch){
            return $state.go('event.new')
          }
          ctrl.eventSketch = sketch;
          ctrl.routes = sketch.routes
          ctrl.nonAttachedVolunteers = sketch.nonAttachedVolunteers;
          ctrl.nonAttachhedFamilies = sketch.nonAttachhedFamilies;
          ctrl.isLoading = false;
          return
        })
    } else {
      eventService.createSketch()
        .then(eventSketch => {
          ctrl.isLoading = false;
          ctrl.eventSketch = eventSketch;
          let len = ctrl.families.length > ctrl.volunteers.length ? ctrl.volunteers.length : ctrl.families.length
          for (var i = 0; i < len; i++) {
            ctrl.eventService.attachRouteToEvent(eventSketch, {
                families: [ctrl.families.shift()],
                volunteers: [ctrl.volunteers.shift()]
              })
              .then(route => {
                ctrl.routes.push(route)
              })
          }
          eventService.updateNonAttachedFamiliesAndVolunteers(eventSketch._id, ctrl.families, ctrl.volunteers)
          .then(console.log)
          ctrl.families && ctrl.families.forEach(_ => ctrl.nonAttachhedFamilies.push(ctrl.families.shift()))
          ctrl.volunteers && ctrl.volunteers.forEach(_ => ctrl.nonAttachedVolunteers.push(ctrl.volunteers.shift()))
        })
    }



    // let cache = eventService.getCacheSketch();
    // if ((!$stateParams.families || !$stateParams.volunteers || $stateParams.families.length == 0 || $stateParams.volunteers.length == 0) && (!cache || cache.routes.length == 0)) {
    //   $state.go('event.new')
    // } else {

    // ctrl.nonAttachhedFamilies = ctrl.nonAttachhedFamilies.concat(data.families)
    // ctrl.nonAttachedVolunteers = ctrl.nonAttachedVolunteers.concat(data.volunteers)
    //this.updateCache();
    //   } else {
    //     data = cache;
    //     ctrl.routes = data.routes;
    //     ctrl.nonAttachhedFamilies =  data.nonAttachhedFamilies
    //     ctrl.nonAttachedVolunteers = data.nonAttachedVolunteers
    //   }
    // }
    // ctrl.isLoading = false; //change to true
  }

  // $onInit(){
  //   this.eventService.getSketchEvent()
  //   .then(event => {
  //     this.eventSketch = event;
  //     this.socket.syncUpdates('events', this.eventSketch,(a,b,c) => {
  //       console.log('syncUpdates:events', a,b,c);
  //     });
  //     return event._id
  //   })
  //   .then(sketchId => {
  //     return this.eventService.getRoutesForSketch(sketchId)
  //   })
  //   .then(routes => {
  //     this.socket.syncUpdates('routes', this.eventSketch.routes,(a,b,c) => {
  //       console.log('syncUpdates:routes', a,b,c);
  //     });
  //   })
  //
  // }

  updateStatisticsClass() {
    if (this.showFamilies && this.showVolunteers) this.routesClass = 'col-md-8';
    else if (!this.showFamilies && !this.showVolunteers) this.routesClass = 'col-md-8 col-md-offset-2';
    else if (!this.showFamilies && this.showVolunteers) this.routesClass = 'col-md-8 col-md-offset-2';
    else this.routesClass = 'col-md-8';
  }

  toggleFamilies() {
    this.showFamilies = !this.showFamilies
    if (this.showFamilies) {
      this.icons.families.shape = 'fast_rewind';
      this.icons.families.color = 'fill: #2196F3';
      this.updateStatisticsClass();
    } else {
      this.icons.families.shape = 'group';
      this.icons.families.color = 'fill: #9C27B0';
      this.$timeout(() => {
        this.updateStatisticsClass();
      }, 1000);
    }
  }

  addEmptyRoute() {
    this.routes.unshift(Object.assign({}, emptyRoute))
  }

  updateCache() {
    this.eventService.setCacheSketch({
      routes: this.routes,
      nonAttachhedFamilies: this.nonAttachhedFamilies,
      nonAttachedVolunteers: this.nonAttachedVolunteers
    })
  }

  saveEvent() {}

  onRemoveRoute(families, volunteers, index) {
    this.routes.splice(index, 1)
    this.nonAttachhedFamilies = this.nonAttachhedFamilies.concat(families)
    this.nonAttachedVolunteers = this.nonAttachedVolunteers.concat(volunteers)
      //this.updateCache();
  }

  toggleVolunteers() {
    this.showVolunteers = !this.showVolunteers;
    if (this.showVolunteers) {
      this.icons.volunteers.shape = 'fast_forward';
      this.icons.volunteers.color = 'fill: #2196F3';
      this.updateStatisticsClass();
    } else {
      this.icons.volunteers.shape = 'account_box';
      this.icons.volunteers.color = 'fill: #9C27B0';
      this.$timeout(() => {
        this.updateStatisticsClass();
      }, 1000);
    }
  }

  //index that was drop from the out route
  dropNonAttachedVolunteerSuccessHandler($event, index) {
    this.nonAttachedVolunteers.splice(index, 1)
      //this.updateCache();
  }

  //The droped volunteer comes here
  onDropNonAttachedVolunteer($event, volunteer) {
    this.nonAttachedVolunteers.push(volunteer);
    //this.updateCache();
  }

  //index that was drop from the out route
  dropNonAttachedFamilySuccessHandler($event, index) {
    this.nonAttachhedFamilies.splice(index, 1);
    //this.updateCache();

  }

  //The droped family comes here
  onDropNonAttachedFamily($event, family) {
    this.nonAttachhedFamilies.push(family);
    //this.updateCache();
  }

  sendRoute(index) {
    this.Notification
      .success({
        message: '',
        title: 'Ready',
        onClose: (a, b, c, d) => {
          console.log(a, b, c, d);
        }
      });
  }

  updateRoute(index, route, updatedRoute) {
    if (updatedRoute.families.length === 0 && updatedRoute.volunteers.length === 0) {
      this.routes.splice(index, 1);
    } else {
      this.routes[index] = updatedRoute;
    }
    this.updateCache()
  }

  showDetails(index) {
    this.showDetailsAboutRoute = true;
    this.selectedRoute = this.routes[index];
    this.selectedRoute.families.forEach(family => {
      this.model.map.wayPoints.push({
        location: family.address,
        stopover: true
      })
    })
    this.model.map.destination = this.selectedRoute.volunteers[0].address;
  }

  closeRouteDetailsDialog() {
    this.showDetailsAboutRoute = !this.showDetailsAboutRoute;
    this.model.map.wayPoints = [];
    this.model.map.destination = null;
  }

}

export default {
  component: {
    template: require('./eventSketch.html'),
    controller: ['NgMap', 'familyService', 'eventService', '$state', '$stateParams', '$timeout', 'Notification', '$scope', 'socket', EventSketchController],
    bindings: {}
  },
  name: 'eventSketch'
}
