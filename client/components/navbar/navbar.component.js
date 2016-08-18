'use strict';

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'state': 'main',
    requireLogin: true,
    minimumPermission : 'user'
  }, {
    'title': 'Family',
    'state': 'family',
    requireLogin: true,
    minimumPermission : 'user'
  }];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
    this.hasRole = Auth.hasRole
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.menu.forEach((menuItem) => {
      menuItem.visible = false;
      menuItem.visible = this.showItem(menuItem)
    })
  }

  showItem(item){
    if(item.requireLogin){
      if(item.minimumPermission){
        this.hasRole(item.minimumPermission).then(result => {
          item.visible = result
        })
      }
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
