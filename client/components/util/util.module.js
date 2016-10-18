
'use strict';

import {
  UtilService
} from './util.service';

import networdService from './util.network.service';
import locationService from './util.location.service';

export default angular.module('b7beetApp.util', [])
  .factory('Util', UtilService)
  .service(networdService.name, networdService.service)
  .service(locationService.name, locationService.service)
  .name;
