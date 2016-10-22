'use strict';

import mongoose from 'mongoose';

var RouteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  families: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  }],
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  parent: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
  },
  state: {
    type: String,
    /**
     * [enum desctiption {
     *       created: the dafault state of route
     *       passed: will change when the client send one route or save the whole event sketch
     *       done: will change when the volunteer will done with all the waypoints
     * }]
     * @type {enumeration}
     */
    enum: ['created', 'passed', 'done'],
    default: 'created'
  },
  /**
   * [wayPoints ]
   * @type {Array}
   */
  wayPoints: [Number],
  /**
   * [comments description]
   * TODO: have to design it first!
   * @type {Array}
   */
  comments: []
});

export default mongoose.model('Route', RouteSchema);
