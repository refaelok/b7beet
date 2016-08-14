'use strict';

export class NewFamilyController{
  newFamilyClicked(){
    this.onNewFamilyButtonClick()
  }
}

export default {
  component: {
    template: require('./newFamily.html'),
    controller: NewFamilyController,
    bindings: {
      onNewFamilyButtonClick: '&'
    }
  },
  name: 'newFamily'
}
