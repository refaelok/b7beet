/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  upsert
 * PATCH   /api/events/:id          ->  patch
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Event from './event.model';
import Route from '../route/route.model';
import _ from 'lodash';
import mongoose from 'mongoose';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        console.log('doc saved', updated);
        return updated;
      });
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error('error', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Events
export function index(req, res) {
  return Event.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function indexWithState(req, res) {
  if (req.params.state && ['close', 'upcoming', 'ongoing', 'sketch'].indexOf(req.params.state) != -1)
    return Event.find({
        state: req.params.state
      }).exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  else {
    return handleEntityNotFound(res)()
  }
}

// Gets a single Event from the DB
export function show(req, res) {
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Event in the DB
export function create(req, res) {
  Event.find({
      state: 'sketch'
    }).exec()
    .then(routes => {
      console.log(routes);
      routes.forEach(route => route.remove())
    })
  return Event.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Event in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  // return Event.findOneAndUpdate(req.params.id, req.body, {
  //   upsert: true,
  //   setDefaultsOnInsert: true,
  //   runValidators: true
  // }).exec()
  // .then(e => {
  //   return e.save().then(a => {
  //     console.log('doc saved', a);
  //     return a;
  //   });
  // })
  Event.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(convertStringsToObjectIds(req.body))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Event in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Event from the DB
export function destroy(req, res) {
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function attachRoute(req, res) {
  return Event.findById(req.params.sketch).exec()
    .then(handleEntityNotFound(res))
    .then(sketch => {
      if (sketch) {
        req.body.route.parent = req.body.sketchId;
        return Promise.all([Route.create(req.body.route), sketch]);
      }
      return null;
    })
    .then(pushRouteToEvent)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function pushRouteToEvent(routeEventPair) {
  let sketch = routeEventPair[1];
  let route = routeEventPair[0];
  sketch.routes.push(route._id);
  sketch.save()
  return route;
}

function convertStringsToObjectIds(data) {
  return function(eventEntity) {
      data.nonAttachedVolunteers && data.nonAttachedVolunteers.map(v_id => eventEntity.nonAttachedVolunteers.push(mongoose.Types.ObjectId(v_id)))
      data.nonAttachhedFamilies && data.nonAttachhedFamilies.map(f_id => eventEntity.nonAttachhedFamilies.push(mongoose.Types.ObjectId(f_id)))
      return eventEntity.save().then(a => {console.log('saved' , a); return a;})
  }
}
