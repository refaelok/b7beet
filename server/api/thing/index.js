'use strict';

import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', auth.hasRole('user'), controller.index);
router.get('/:id', auth.hasRole('user'), controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.upsert);
router.patch('/:id', auth.hasRole('user'), controller.patch);
router.delete('/:id', auth.hasRole('manager'), controller.destroy);

module.exports = router;
