'use strict';

import mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp');

var FamilySchema = new mongoose.Schema({
	name: String,
	contact: {
		name: String,
		phone: String
	},
	address: mongoose.Schema.Types.Mixed,
	details: String,
	familyTree: [{
		name: String,
		role: String,
		age: Number
	}]

});

FamilySchema.plugin(timestamps);

export default mongoose.model('Family', FamilySchema);
