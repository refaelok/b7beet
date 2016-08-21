
'use strict';

import {
  UtilService
} from './util.service';

import networdService from './util.network.service';

export default angular.module('b7beetApp.util', [])
  .factory('Util', UtilService)
  .service(networdService.name, networdService.service)
  .name;
