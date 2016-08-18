'use strict';

import routes from './admin.routes';
import AdminController from './admin.controller';
import constants from '../../app/app.constants';

export default angular.module('b7beetApp.admin', ['b7beetApp.auth', 'ui.router', constants])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
