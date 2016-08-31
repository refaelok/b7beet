import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './event.routes';
import event from './event.component';
import 'angular-drag-and-drop-lists';
// import eventList from '../../components/eventModule/eventList/eventList.component';
// import eventIndividual from '../../components/eventIndividual/eventIndividual.component';
// import eventForm from '../../components/eventForm/eventForm.component';
import newevent from '../../components/eventModule/newEvent/newEvent.component';
// import eventService from '../../components/eventService/eventService.service';

export default angular.module('b7beetApp.event', [uiRouter, 'dndLists'])
  .config(routing)
  // .service(eventService.name, eventService.service)
  .component(event.name, event.component)
  // .component(eventList.name, eventList.component)
  // .component(eventIndividual.name, eventIndividual.component)
  // .component(eventForm.name, eventForm.component)
  .component(newevent.name, newevent.component)
  .name;
