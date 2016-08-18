'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp')
	,mongooseHistory = require('mongoose-history')

var FamilySchema = new mongoose.Schema({
	name: String,
	active: {
		type: Boolean,
		default: true
	},
	contact: {
		name: String,
		phone: String,
		details: String
	},
	address: mongoose.Schema.Types.Mixed,
	details: String,
	familyTree: [{
		name: String,
		role: String,
		age: Number,
		phone: String
	}],
	addedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

});

FamilySchema.plugin(timestamps);
FamilySchema.plugin(mongooseHistory)

export default mongoose.model('Family', FamilySchema);
