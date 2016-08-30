'use strict';

export class NewEventController{
  constructor(){
    console.log(this);
  }

}

export default {
  component: {
    template: require('./newEvent.html'),
    controller: NewEventController,
    bindings: {
      families: '<',
      volunteers: '<'
    }
  },
  name: 'newEvent'
}
