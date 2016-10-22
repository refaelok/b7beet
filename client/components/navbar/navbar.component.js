'use strict';

export class NavbarComponent {
    menu = [{
        title: 'Home',
        state: 'main',
        requireLogin: true,
        minimumPermission: 'user'
    }, {
        title: 'Family',
        state: 'family',
        requireLogin: true,
        minimumPermission: 'user'
    }, {
        title: 'Volunteer',
        state: 'volunteer',
        requireLogin: true,
        minimumPermission: 'user'
    }];

    isLoggedIn: Function;
    isAdmin: Function;
    getCurrentUser: Function;
    isCollapsed = true;
    constructor(Auth, $state, navbarService) {
        'ngInject';
        this.hasRoleSync = Auth.hasRoleSync
        this.isLoggedIn = Auth.isLoggedInSync;
        this.isAdmin = Auth.isAdminSync;
        this.getCurrentUser = Auth.getCurrentUserSync;
        this.$state = $state;
        this.toggleDropDownEvent = false;
        this.navbarState = navbarService.getNavbarState;
    }

     toggleDropDown(){
       this.toggleDropDownEvent = !this.toggleDropDownEvent;
     }

     sref(to){
       this.$state.go(to) && this.toggleDropDown()
     }

    showMenutItem(item) {
        if (item.requireLogin && this.isLoggedIn()) {
            if (item.minimumPermission) {
                var role = this.getCurrentUser().role;
                var result = this.hasRoleSync(item.minimumPermission);
                return result
            }
            return this.isLoggedIn()
        }
        return false;
    }

}

export
default angular.module('directives.navbar', [])
    .component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarComponent
    })
    .service('navbarService', function(){
      this.showNavbar = true;
      this.getNavbarState = () => {
        return this.showNavbar
      }
      this.disableNavbar = () => {
        this.showNavbar = false;
      }
      this.enableNavbar = () => {
        this.showNavbar = true;
      }
    })
    .name;
