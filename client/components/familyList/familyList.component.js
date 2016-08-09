'use strict';

Class FamilyListController() 
  this.message = 'World';
}

angular.module('b7beetApp.family')
	.component('familyList', {
    template: require('./family.html'),
    controller: FamilyListController
  })
