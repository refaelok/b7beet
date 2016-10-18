import angular from 'angular';
import stickyIcon from './stickyIcon.component';

export default angular.module('stickyIcon', [])
  .component(stickyIcon.name, stickyIcon.component)
  .name;
