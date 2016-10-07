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
	phone: {
		type: String
	},
	address: mongoose.Schema.Types.Mixed,
	details: String,
	familyTree: [{
		name: String,
		role: String,
		birthDate: Date,
		phone: String,
		additionalData: String
	}],
	addedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	inWaitingList: {
		type: Boolean,
		default: false
	}

});

FamilySchema.plugin(timestamps);
FamilySchema.plugin(mongooseHistory)

export default mongoose.model('Family', FamilySchema);
