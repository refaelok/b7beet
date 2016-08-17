'use strict';

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Family',
    'state': 'family',
    requireLogin: true
  }];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  showItem(item){
    if(item.requireLogin){
      return this.isLoggedIn();
    } 
    return true;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
