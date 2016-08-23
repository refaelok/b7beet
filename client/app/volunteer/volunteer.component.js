export class volunteerController {
  constructor(socket, $scope, volunteerService) {
    const ctrl = this;
    ctrl.volunteerService = volunteerService;
    ctrl.socket = socket;
    ctrl.model = {}
    ctrl.model.volunteerList = [];
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('volunteer');
    });
  }

  $onInit() {
    this.volunteerService.getAllVolunteers()
      .then(list => {
        this.model.volunteerList = list;
        this.socket.syncUpdates('volunteer', this.model.volunteerList,(a,b,c) => {
        });
      })
  }

  onNewVolunteerButtonClick(){
    this.model.showVolunteerForm = !this.model.showVolunteerForm;
  }

  addNewVolunteer(volunteer){
    this.model.showVolunteerForm = false;
    this.volunteerService.addNewVolunteer(volunteer)
  }

  removeVolunteer(volunteer){
    this.volunteerService.removeVolunteer(volunteer)
  }

  modifyVolunteer(volunteer){
    this.volunteerService.updateVolunteer(volunteer)
  }

}

export default {
  name: 'volunteer',
  component: {
    template: require('./volunteer.html'),
    controller: ['socket', '$scope', 'volunteerService', volunteerController],
  }
}
