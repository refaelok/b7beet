'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp')
	,mongooseHistory = require('mongoose-history')

var EventSchema = new mongoose.Schema({
  date: Date,
	routes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Route'
	}],
  additionalData: String,
  active: {
    type: Boolean,
    default: true
  },
  state: {
		type: String,
		enum: ['close', 'upcoming', 'ongoing', 'sketch']
	},
	nonAttachhedFamilies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Family'
	}],
	nonAttachedVolunteers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Volunteer'
	}]
});

EventSchema.plugin(timestamps);
EventSchema.plugin(mongooseHistory)

export default mongoose.model('Event', EventSchema);
