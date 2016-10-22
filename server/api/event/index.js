'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', auth.hasRole('user'), controller.index);
router.get('/byState/:state', auth.hasRole('user'), controller.indexWithState);
router.get('/:id', auth.hasRole('user'), controller.show);
router.post('/', auth.hasRole('member'), controller.create);
router.post('/addRoute/:sketch', controller.attachRoute);
router.put('/:id', auth.hasRole('member'), controller.upsert);
router.patch('/:id', auth.hasRole('member'), controller.patch);
router.delete('/:id', auth.hasRole('manager'), controller.destroy);

module.exports = router;
