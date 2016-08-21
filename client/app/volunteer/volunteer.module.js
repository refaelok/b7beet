import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './volunteer.routes';
import volunteer from './volunteer.component';



export default angular.module('b7beetApp.volunteer', [uiRouter])
  .config(routing)
  .component(volunteer.name, volunteer.component)
  .name;
