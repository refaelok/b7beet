'use strict';

import familyInfo from '../../familyInfo/familyInfo.component';

export class EventRouteController {
  constructor() {
    if (!this.data.families) this.data.families = []
    if (!this.data.volunteers) this.data.volunteers = []
    console.log(this);
  }

  $onInit() {}


  //index that was drop from the out route
  dropFamilySuccessHandler($event, index) {
    this.data.families.splice(index, 1)
    this.data.$update();
    this.onUpdate({updatedRoute: this.data});
  }

  //The droped family comes here
  onDropFamily($event, family) {
    this.data.families.push(family)
    this.data.$update();
    this.onUpdate({updatedRoute: this.data});
  }

  //index that was drop from the out route
  dropVolunteerSuccessHandler($event, index) {
    this.data.volunteers.splice(index, 1)
    this.onUpdate({updatedRoute: this.data});
  }

  //The droped volunteer comes here
  onDropVolunteer($event, volunteer) {
    this.data.volunteers.push(volunteer)
    this.onUpdate({updatedRoute: this.data});
  }

  removeRoute() {
    this.onRemove({
      families: this.data.families,
      volunteers: this.data.volunteers
    })
  }
}

export default {
  component: {
    template: require('./eventRoute.html'),
    controller: [EventRouteController],
    bindings: {
      data: '<',
      onRemove: '&',
      onMore: '&',
      onSend: '&',
      onUpdate: '&'
    }
  },
  name: 'eventRoute'
}
