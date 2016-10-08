import angular from 'angular';
import loader from './loader.component';

export default angular.module('loader', [])
  .component(loader.name, loader.component)
  .name;
