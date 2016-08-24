'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp')
	,mongooseHistory = require('mongoose-history')

var VolunteerSchema = new mongoose.Schema({
  name: String,
  details: String,
  active: {
    type: Boolean,
    default: true
  },
	address: mongoose.Schema.Types.Mixed,
  birthDate: {
    type: Date,
    default: undefined
  },
  joinDate: {
    type: Date,
    default: undefined
  },
	email: String,
	gender: {
		type: String,
		num: ['Male', 'Female']
	},
	preference: String,
	phoneNumber: String
});

VolunteerSchema.plugin(timestamps);
VolunteerSchema.plugin(mongooseHistory)

export default mongoose.model('Volunteer', VolunteerSchema);
