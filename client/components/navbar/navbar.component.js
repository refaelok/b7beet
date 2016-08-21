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
    }];

    isLoggedIn: Function;
    isAdmin: Function;
    getCurrentUser: Function;
    isCollapsed = true;

    constructor(Auth) {
        'ngInject';
        this.hasRoleSync = Auth.hasRoleSync
        this.isLoggedIn = Auth.isLoggedInSync;
        this.isAdmin = Auth.isAdminSync;
        this.getCurrentUser = Auth.getCurrentUserSync;

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
    .name;