'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import ngMap from 'ngmap';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
//import ngValidationMatch from 'angular-validation-match';

import {
  routeConfig
} from './app.config';
import 'ng-autocomplete';
import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import family from './family/family.module';
import volunteer from './volunteer/volunteer.module';

import './app.scss';

angular.module('b7beetApp', [
    // ngAnimate,
    ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, uiBootstrap,
    // ngMessages,
    ngMap, 'ngAutocomplete',
    // ngValidationMatch,
    _Auth, account, admin, navbar, footer, main, constants, socket, util,
    family,volunteer
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['b7beetApp'], {
      strictDi: true
    });
  });
