import angular from 'angular';

export class FamilyListController{
  constructor() {
    const ctrl = this;
    ctrl.model = {};
    ctrl.model.families = [];
  }

  $onInit(){
    // TODO: implement later

  }

  $onChanges(changesObj) {
    this.model.families = changesObj.families.currentValue
  }

  familyClicked(family){
    this.onFamilyClick( { family } )
  }
}

export default {
  component: {
    template: require('./familyList.html'),
    controller: [FamilyListController],
    bindings: {
      families: '<',
      onFamilyClick: '&'
    }
  },
  name: 'familyList'
}
