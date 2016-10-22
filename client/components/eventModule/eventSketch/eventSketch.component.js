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
  constructor(NgMap, familyService, eventService, $state, $stateParams, $timeout, Notification, $scope, socket, navbarService) {
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
      socket.unsyncUpdates('routes');
    });
    ctrl.selectedRoute = null;
    ctrl.model.map = {
      travelMode: 'DRIVING',
      wayPoints: [],
      origin: '31.2539446,34.7925381',
      destination: null,
      center: [31.2509633, 34.7953221],
      optimize: true
    }
    ctrl.$timeout = $timeout;
    ctrl.NgMap = NgMap;
    this.navbarService = navbarService;
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
    ctrl.$stateParams = $stateParams;
    ctrl.$state = $state;

  }

  $onInit() {
    const ctrl = this;
    this.triggerResize()
    if (!this.$stateParams.families || !this.$stateParams.volunteers || this.$stateParams.families.length == 0 || this.$stateParams.volunteers.length == 0) {
      this.eventService.getSketchEvent()
        .then(sketch => {
          if (!sketch) {
            return this.$state.go('event.new')
          }
          ctrl.eventSketch = sketch;
          ctrl.routes = sketch.routes
          ctrl.isLoading = false;
          syncRoutes.call(this)
          return
        })
    } else {
      this.eventService.createSketch()
        .then(eventSketch => {
          ctrl.eventSketch = eventSketch;
          let fLen = ctrl.families.length;
          this.eventService
            .clusterize(ctrl.families, ctrl.volunteers, Math.floor(fLen / 3))
            .then(clusterizedArray => {
              clusterizedArray.groups.forEach(group => {
                let families = [];
                let arrays = [];
                group.clusterInd.forEach(ind => {
                  families.push(ctrl.families[ind])
                })
                if (families.length > 3) {
                  let size = 3
                  while (families.length > 0)
                    arrays.push(families.splice(0, size));
                } else {
                  arrays.push(families)
                }
                arrays.forEach(array => {
                  ctrl.eventService.attachRouteToEvent(eventSketch, {
                      families: array,
                      volunteers: []
                    })
                    .then(route => {
                      ctrl.routes.push(route)
                    })
                })
              })
              return clusterizedArray;
            })
            .then(clusterizedArray => {
              let familiesToPop = []
              clusterizedArray.groups.forEach(group => {
                group.clusterInd.forEach(ind => {
                  familiesToPop.push(ctrl.families[ind]);
                })
              })
              return familiesToPop
            })
            .then(families => {
              families.forEach(family => {
                let index = ctrl.families.indexOf(family);
                if (index > -1)
                  ctrl.families.pop(index)
              })
              ctrl.families && ctrl.families.forEach(_ => ctrl.eventSketch.nonAttachhedFamilies.push(ctrl.families.shift()))
              ctrl.isLoading = false;
            })
          syncRoutes.call(this)
          this.eventService.updateNonAttachedFamiliesAndVolunteers(eventSketch._id, ctrl.families, ctrl.volunteers)
          .then( _ => {
            ctrl.eventSketch.nonAttachedVolunteers = ctrl.volunteers
            // ctrl.volunteers && ctrl.volunteers.forEach(_ => ctrl.eventSketch.nonAttachedVolunteers.push(ctrl.volunteers.shift()))
          })
        })
    }

    function syncRoutes() {
      this.socket.syncUpdates('route', this.eventSketch.routes, (event, object, array) => {
        (event === 'updated' || event === 'created') && (() => {
          console.log(event);
          this.eventService.getRouteById(object._id).then((route) => {
            let index = _.findIndex(this.eventSketch.routes, ['_id', object._id])
            index > -1 && (() => {
              this.eventSketch.routes[index] = route
            })()
          })
        })()
      });
    }
  }

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
    // this.routes.unshift(Object.assign({}, emptyRoute))
    this.eventService.attachRouteToEvent(this.eventSketch, emptyRoute)
  }



  saveEvent() {
    this.eventService.saveEvent(this.eventSketch)
  }

  onRemoveRoute(families, volunteers, index) {
    this.routes[index].$delete()
    this.routes.splice(index, 1)
    this.eventSketch.nonAttachhedFamilies = this.eventSketch.nonAttachhedFamilies.concat(families)
    this.eventSketch.nonAttachedVolunteers = this.eventSketch.nonAttachedVolunteers.concat(volunteers)
    this.eventService.updateNonAttachedFamiliesAndVolunteers(this.eventSketch._id, this.eventSketch.nonAttachhedFamilies, this.eventSketch.nonAttachedVolunteers);
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
    this.eventSketch.nonAttachedVolunteers.splice(index, 1)
    this.eventService.updateSketch(this.eventSketch._id, {
      nonAttachedVolunteers: this.eventSketch.nonAttachedVolunteers
    });
  }

  //The droped volunteer comes here
  onDropNonAttachedVolunteer($event, volunteer) {
    this.eventSketch.nonAttachedVolunteers.push(volunteer);
    this.eventService.updateSketch(this.eventSketch._id, {
      nonAttachedVolunteers: this.eventSketch.nonAttachedVolunteers
    });
  }

  //index that was drop from the out route
  dropNonAttachedFamilySuccessHandler($event, index) {
    this.eventSketch.nonAttachhedFamilies.splice(index, 1);
    this.eventService.updateSketch(this.eventSketch._id, {
      nonAttachhedFamilies: this.eventSketch.nonAttachhedFamilies
    });

  }

  //The droped family comes here
  onDropNonAttachedFamily($event, family) {
    this.eventSketch.nonAttachhedFamilies.push(family);
    this.eventService.updateSketch(this.eventSketch._id, {
      nonAttachhedFamilies: this.eventSketch.nonAttachhedFamilies
    });
  }

  sendRoute(index) {
    let route = this.routes[index];
    // TODO: Validate no of families and volunteers
    this.Notification
      .success({
        message: `
          Url has been copied, send it to the volunteers
        `,
        title: 'Ready',
        onClose: (a, b, c, d) => {
        }
      });

      route.state = 'passed';
      route.$update()

  }

  updateRoute(index, route, updatedRoute) {
    if (updatedRoute.families.length === 0 && updatedRoute.volunteers.length === 0) {
      this.routes.splice(index, 1);
    } else {
      this.routes[index] = updatedRoute;
    }
  }

  showDetails(index) {
    this.showDetailsAboutRoute = true;
    this.selectedRoute = this.routes[index];
    this.selectedRoute.families.forEach(family => {
      this.model.map.wayPoints.push({
        location: family.address.latlng,
        stopover: true
      })
    })

    this.model.map.destination = this.selectedRoute.volunteers[0].address.latlng;
    this.triggerResize()
  }

  closeRouteDetailsDialog() {
    this.showDetailsAboutRoute = !this.showDetailsAboutRoute;
    this.model.map.wayPoints = [];
    this.model.map.destination = null;
  }

  triggerResize() {
    this.NgMap.getMap({
        id: 'routesMap'
      })
      .then(map => {
        google.maps.event.trigger(map, "resize");
        map.setZoom(14);
      })
  }

  loadMore(){
    this.loadMoreVolunteers = !this.loadMoreVolunteers;
    this.eventService.getAllVolunteers().then((volunteers) => {
      let vols = [];
      volunteers.forEach(v => {
        if(this.eventSketch.nonAttachedVolunteers.map(nav => { return nav._id }).indexOf(v._id) === -1 && !volunteerExistInSomeRoute.call(this,v)){
          vols.push(v)
        }
      })
      this.volunteers = vols;
    })

    function volunteerExistInSomeRoute(volunteer){
      let result = false;
      this.routes.forEach(r => {
        if(r.volunteers.map(nav => { return nav._id }).indexOf(volunteer._id) > -1)
          result = true;
      })
      return result
    }
  }

  addVolunteerToSketch(volunteer){
    let index = this.volunteers.indexOf(volunteer),
        v = this.volunteers[index];
    this.volunteers.splice(index,1);
    this.eventSketch.nonAttachedVolunteers.push(v);
    this.eventService.updateNonAttachedFamiliesAndVolunteers(this.eventSketch._id, [], this.eventSketch.nonAttachedVolunteers)
  }

}

export default {
  component: {
    template: require('./eventSketch.html'),
    controller: ['NgMap', 'familyService', 'eventService', '$state', '$stateParams', '$timeout', 'Notification', '$scope', 'socket', 'navbarService', EventSketchController],
    bindings: {}
  },
  name: 'eventSketch'
}
