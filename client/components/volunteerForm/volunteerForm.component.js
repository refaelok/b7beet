export class VolunteerFormController{
  constructor() {
    const ctrl = this;
    ctrl.model = {};
    ctrl.model.genders = ['Male', 'Female'];
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
        maxDate: Date.now(),
        /**
         * @param {Date}  [min date is 18 year from now, calculated by 301556926 * 10^10 : one year in milliseconds times 18 years ]
         */
        minDate: new Date(Date.now() - 3.1556926 * Math.pow(10, 10) * 18)
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
        maxDate: Date.now(),
        /**
         * @param {Date}  [min date is 18 year from now, calculated by 301556926 * 10^10 : one year in milliseconds times 18 years ]
         */
        minDate: new Date(Date.now() - 3.1556926 * Math.pow(10, 10) * 18)
      }
    }

  }

  $onInit(){

  }

  $onChanges(changesObj) {
  }

  createNewVolunteer(){
    this.onNewVolunteerSubmit({volunteer: this.model.volunteer})
    this.model.volunteer = {};
  }

}

export default {
  component: {
    template: require('./volunteerForm.html'),
    controller: [VolunteerFormController],
    bindings: {
      onNewVolunteerSubmit: '&'
    }
  },
  name: 'volunteerForm'
}
