export class VolunteerIndividualController{
  constructor() {
    const ctrl = this;
    ctrl.model = {};
  }

  $onInit(){
    // TODO: implement later

  }

  $onChanges(changesObj) {
    this.model.individual = changesObj.individual.currentValue
  }

}

export default {
  component: {
    template: require('./volunteerIndividual.html'),
    controller: [VolunteerIndividualController],
    bindings: {
      individual: '<'
    }
  },
  name: 'volunteerIndividual'
}
