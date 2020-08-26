const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'class',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('subject', subjectSchema);
