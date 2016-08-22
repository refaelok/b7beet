import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './volunteer.routes';
import volunteer from './volunteer.component';
import volunteerList from '../../components/volunteerList/volunteerList.component';
import volunteerIndividual from '../../components/volunteerIndividual/volunteerIndividual.component';
import volunteerForm from '../../components/volunteerForm/volunteerForm.component';
import newVolunteer from '../../components/newVolunteer/newVolunteer.component';


export default angular.module('b7beetApp.volunteer', [uiRouter])
  .config(routing)
  .component(volunteer.name, volunteer.component)
  .component(volunteerList.name, volunteerList.component)
  .component(volunteerIndividual.name, volunteerIndividual.component)
  .component(volunteerForm.name, volunteerForm.component)
  .component(newVolunteer.name, newVolunteer.component)
  .name;
