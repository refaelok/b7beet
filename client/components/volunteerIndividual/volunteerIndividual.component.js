export class VolunteerIndividualController{
  constructor(Auth) {
    const ctrl = this;
    ctrl.model = {};
    ctrl.model.u_individual = _.cloneDeep(this.individual)
    ctrl.hasRole = Auth.hasRoleSync
    console.log(this.individual);
    if(ctrl.model.u_individual.joinDate)
      ctrl.model.u_individual.joinDate = new Date(ctrl.model.u_individual.joinDate);
    if(ctrl.model.u_individual.birthDate)
      ctrl.model.u_individual.birthDate = new Date(ctrl.model.u_individual.birthDate);

    ctrl.model.calendar = {
      birthDate: {
        inlineOptions: {
          minDate: new Date(),
          showWeeks: true
        },
        isOpen: false,
        /**
         * @return {Date} [max date is today , birthDate cannot be in the future]
         */
        maxDate: Date.now()
      },
      joinDate: {
        inlineOptions: {
          minDate: new Date(),
          showWeeks: true
        },
        isOpen: false,
        /**
         * @return {Date} [max date is today , birthDate cannot be in the future]
         */
        maxDate: Date.now()
      }
    }
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
