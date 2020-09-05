const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
	exam_name: {
		type: String,
		required: true,
	},
	starting_date: {
		type: String,
		required: true,
	},
	ending_date: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('exam', examSchema);
