import angular from 'angular';
import card from './card.component';

export default angular.module('card', [])
  .component(card.name, card.component)
  .name;
