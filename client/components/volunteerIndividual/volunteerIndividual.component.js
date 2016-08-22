export class VolunteerIndividualController{
  constructor(Auth) {
    const ctrl = this;
    ctrl.model = {};
    ctrl.hasRole = Auth.hasRoleSync
  }

  $onInit(){
    // TODO: implement later
  }

  $onChanges(changesObj) {
    this.model.individual = changesObj.individual.currentValue
  }

  removeVolunteer(volunteer){
    this.onDeleteVolunteer({volunteer: this.model.individual})
  }

  saveVolunteer(){
    this.onVolunteerModification({volunteer: this.model.individual})
  }

}

export default {
  component: {
    template: require('./volunteerIndividual.html'),
    controller: ['Auth', VolunteerIndividualController],
    bindings: {
      individual: '<',
      onDeleteVolunteer: '&',
      onVolunteerModification: '&'
    }
  },
  name: 'volunteerIndividual'
}
