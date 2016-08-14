'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp');

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
	}]

});

FamilySchema.plugin(timestamps);

export default mongoose.model('Family', FamilySchema);
