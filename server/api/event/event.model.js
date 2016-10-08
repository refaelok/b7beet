'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp')
	,mongooseHistory = require('mongoose-history')

var EventSchema = new mongoose.Schema({
  date: Date,
  families: [],
  volunteers: [],
  additionalData: String,
  active: {
    type: Boolean,
    default: true
  },
  state: {
		type: String,
		enum: ['close', 'upcoming', 'ongoing']
	}
});

EventSchema.plugin(timestamps);
EventSchema.plugin(mongooseHistory)

export default mongoose.model('Event', EventSchema);
