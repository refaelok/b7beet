import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './route.routes';
import route from './route.component';
import searchRoute from '../../components/routeModule/searchRoute/searchRoute.component';
import routeData from '../../components/routeModule/routeData/routeData.component'
import routeService from '../../components/routeModule/routeService/routeService.service'

export default angular.module('b7beetApp.route', [uiRouter])
  .config(routing)
  .service(routeService.name, routeService.service)
  .component(route.name, route.component)
  .component(searchRoute.name, searchRoute.component)
  .component(routeData.name, routeData.component)
  .name;
