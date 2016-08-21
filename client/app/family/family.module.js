import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './family.routes';
import family from './family.component';
import familyList from '../../components/familyList/familyList.component';
import familyIndividual from '../../components/familyIndividual/familyIndividual.component';
import familyInfo from '../../components/familyInfo/familyInfo.component';
import newFamily from '../../components/newFamily/newFamily.component';
import familyService from '../../components/familyService/familyService.service';


export default angular.module('b7beetApp.family', [uiRouter])
  .config(routing)
  .service(familyService.name, familyService.service)
  .component(family.name, family.component)
  .component(familyList.name, familyList.component)
  .component(familyIndividual.name, familyIndividual.component)
  .component(familyInfo.name, familyInfo.component)
  .component(newFamily.name, newFamily.component)
  .name;
