const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
	grade: {
		type: String,
		required: true,
	},
	point: {
		type: Number,
		required: true,
	},
	mark_from: {
		type: Number,
		required: true,
	},
	mark_upto: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('grade', gradeSchema);
