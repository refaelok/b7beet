'use strict';

import {
  UtilService
} from './util.service';
import networkService from './util.network.service';

export default angular.module('b7beetApp.util', [])
  .factory('Util', UtilService)
  .factory(networkService.name, networkService.service)
  .name;
