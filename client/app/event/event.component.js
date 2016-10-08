export class eventController {
  constructor($scope, eventService, $state) {
    const ctrl = this;
    this.$state = $state;
    this.eventService = eventService;
    ctrl.$scope = $scope;
    ctrl.model = {}
    ctrl.model.volunteerList = [];
    ctrl.model.families = [];

  }
  $onInit() {
    this.eventService.getAllVolunteers()
      .then(list => {
        this.model.volunteerList = list;
      })

  this.eventService.getAllFamilies()
    .then(families => {
      this.model.families = families;
    })
  }

  newEvent(){
    return this.$state.go('event.new')
  }
}

export default {
  name: 'eventModule',
  component: {
    template: require('./event.html'),
    controller: ['$scope', 'eventService', '$state', eventController],
  }
}
