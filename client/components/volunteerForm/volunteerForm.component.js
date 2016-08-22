export class VolunteerFormController{
  constructor() {
    const ctrl = this;
    ctrl.model = {};
    ctrl.model.genders = ['Male', 'Female']

  }

  $onInit(){

  }

  $onChanges(changesObj) {
  }

}

export default {
  component: {
    template: require('./volunteerForm.html'),
    controller: [VolunteerFormController],
    bindings: {
    }
  },
  name: 'volunteerForm'
}
