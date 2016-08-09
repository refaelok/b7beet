'use strict';

import family from './family.component';
import {
  familyController
} from './family.component';

describe('Component: familyComponent', function() {
  beforeEach(angular.mock.module(family));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));
});
