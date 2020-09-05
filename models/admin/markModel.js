const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'student',
		required: true,
	},
	mark: {
		type: String,
	},
	exam: {
		type: Schema.Types.ObjectId,
		ref: 'exam',
		required: true,
	},
	comment: {
		type: String,
	},
	grade_point: {
		type: String,
		required: true,
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'grade',
		required: true,
	},
	section: {
		type: Schema.Types.ObjectId,
		ref: 'section',
		required: true,
	},
	_class: {
		type: Schema.Types.ObjectId,
		ref: 'class',
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('mark', markSchema);
