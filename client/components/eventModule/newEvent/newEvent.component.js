'use strict';

export class NewEventController{
  constructor(){
    const ctrl = this;
  }

  test(){
  }

}

export default {
  component: {
    template: require('./newEvent.html'),
    controller: [NewEventController],
    bindings: {
      families: '<',
      volunteers: '<'
    }
  },
  name: 'newEvent'
}
