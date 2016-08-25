'use strict';

import event from './event.component';
import {
  eventController
} from './event.component';

describe('Component: eventComponent', function() {
  beforeEach(angular.mock.module(event));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));
});
