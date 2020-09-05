const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
	date: {
		type: String,
		required: true,
	},
	_class: {
		type: Schema.Types.ObjectId,
		ref: 'class',
		required: true,
	},
	section: {
		type: Schema.Types.ObjectId,
		ref: 'section',
		required: true,
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'subject',
		required: true,
	},
	attendance: {
		type: Object,
		required: true,
	},
});

module.exports = mongoose.model('attendance', attendanceSchema);
