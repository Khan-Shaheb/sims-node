const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
	PFirstName: {
		type: String,
		required: true,
	},
	PLastName: {
		type: String,
		required: true,
	},
	PMobile: {
		type: Number,
		required: true,
	},
	occupation: {
		type: String,
	},
	PEmail: {
		type: String,
	},
	PAddress: {
		type: String,
	},

}, {timestamps: true});

module.exports = mongoose.model('parent', parentSchema);
