'use strict';

var express = require('express');
var controller = require('./route.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/parent/:id', controller.showByParent);
router.get('/noAuthWithRouteId/:id', controller.showNoAuthRoute);
router.get('/noAuthWithPhone/:phone', controller.showNoAuthRoute);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.put('/push/:id', controller.addToSet);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
