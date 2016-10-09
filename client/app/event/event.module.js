import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './event.routes';
import event from './event.component';
import 'angular-drag-and-drop-lists';
import eventPastList from '../../components/eventModule/eventPastList/eventPastList.component';
import eventCover from '../../components/eventModule/eventCover/eventCover.component';
import eventData from '../../components/eventModule/eventData/eventData.component';
import eventSketch from '../../components/eventModule/eventSketch/eventSketch.component';
import eventRoute from '../../components/eventModule/eventRoute/eventRoute.component';
// import eventIndividual from '../../components/eventIndividual/eventIndividual.component';
// import eventForm from '../../components/eventForm/eventForm.component';
import newevent from '../../components/eventModule/newEvent/newEvent.component';
import eventService from '../../components/eventModule/eventService/eventService.service';

export default angular.module('b7beetApp.event', [uiRouter, 'dndLists'])
  .config(routing)
  .service(eventService.name, eventService.service)
  .component(event.name, event.component)
  .component(eventData.name, eventData.component)
  .component(eventPastList.name, eventPastList.component)
  .component(eventCover.name, eventCover.component)
  .component(eventSketch.name, eventSketch.component)
  .component(eventRoute.name, eventRoute.component)
  // .component(eventIndividual.name, eventIndividual.component)
  // .component(eventForm.name, eventForm.component)
  .component(newevent.name, newevent.component)
  .name;
