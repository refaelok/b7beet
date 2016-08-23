export class VolunteerIndividualController{
  constructor(Auth) {
    const ctrl = this;
    ctrl.model = {};
    ctrl.model.u_individual = _.cloneDeep(this.individual)
    ctrl.hasRole = Auth.hasRoleSync
  }

  $onInit(){
    // TODO: implement later
  }

  $onChanges(changesObj) {
    this.model.individual = changesObj.individual.currentValue
  }

  removeVolunteer(volunteer){
    this.onDeleteVolunteer({volunteer: this.individual})
  }

  saveVolunteer(){
    this.onVolunteerModification({volunteer: this.model.u_individual})
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
