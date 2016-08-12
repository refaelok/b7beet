import angular from 'angular';

export class FamilyListComponent {}

export default angular.module('directives.familyList', [])
  .component('familyList', {
    template: require('./familyList.html'),
    controller: FamilyListComponent
  })
  .name;