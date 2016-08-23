'use strict';

export class newVolunteerController{
  newVolunteerClicked(){
    this.onNewVolunteerButtonClick()
  }
}

export default {
  component: {
    template: require('./newVolunteer.html'),
    controller: newVolunteerController,
    bindings: {
      onNewVolunteerButtonClick: '&'
    }
  },
  name: 'newVolunteer'
}
