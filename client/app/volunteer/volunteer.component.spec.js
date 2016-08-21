'use strict';

import volunteer from './volunteer.component';
import {
  volunteerController
} from './volunteer.component';

describe('Component: volunteerComponent', function() {
  beforeEach(angular.mock.module(volunteer));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));
});
