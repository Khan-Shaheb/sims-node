const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema(
	{
		parent_first_name: {
			type: String,
			required: true,
		},
		parent_last_name: {
			type: String,
			required: true,
		},
		parent_mobile: {
			type: Number,
			required: true,
		},
		parent_occupation: {
			type: String,
		},
		parent_email: {
			type: String,
		},
		parent_address: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('parent', parentSchema);
