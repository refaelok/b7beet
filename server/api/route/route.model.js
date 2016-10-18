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
  }
});

export default mongoose.model('Route', RouteSchema);
