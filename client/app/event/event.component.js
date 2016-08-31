export class eventController {
  constructor($scope, socket, familyService, volunteerService) {
    const ctrl = this;
    ctrl.volunteerService = volunteerService;
    ctrl.familyService = familyService;
    ctrl.$scope = $scope;
    ctrl.socket = socket;
    ctrl.model = {}
    ctrl.model.volunteerList = [];
    ctrl.model.families = [];

  }
  $onInit() {
    this.volunteerService.getAllVolunteers()
      .then(list => {
        this.model.volunteerList = list;
        this.socket.syncUpdates('volunteer', this.model.volunteerList,(a,b,c) => {
        });
      })

  this.familyService.getAllFamilies()
    .then(families => {
      this.families = families;
      this.socket.syncUpdates('family', this.families,(a,b,c) => {
      });
    })
  }
}

export default {
  name: 'event',
  component: {
    template: require('./event.html'),
    controller: ['$scope', 'socket', 'familyService', 'volunteerService', eventController],
  }
}
