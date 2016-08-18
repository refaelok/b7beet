'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
	addedBy: {
		name: {
			type: String,
			default: null
		},
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}
});

export default mongoose.model('Thing', ThingSchema);
