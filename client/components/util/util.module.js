'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('b7beetApp.util', [])
  .factory('Util', UtilService)
  .name;
