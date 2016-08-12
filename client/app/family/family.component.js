import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './family.routes';

export class FamilyController {

}

export default angular.module('b7beetApp.family', [])
  .config(routing)
  .component('family', {
    template: require('./family.html'),
    controller: FamilyController
  })
  .name;
