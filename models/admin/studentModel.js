const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	student_first_name: {
		type: String,
		required: true,
	},
	student_last_name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
	},
	student_dob: {
		type: String,
	},
	religion: {
		type: String,
	},
	student_mobile: {
		type: Number,
	},
	student_address: {
		type: String,
	},
	student_email: {
		type: String,
	},
	blood: {
		type: String,
	},
	photo: {
		type: String,
	},
	remarks: {
		type: String,
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
	session: {
		type: Schema.Types.ObjectId,
		ref: 'session',
		required: true,
	},
	registration_no: {
		type: String,
		required: true,
	},
	roll_no: {
		type: Number,
		required: true,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'department',
	},
	admission_no: {
		type: String,
	},
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
});

studentSchema.set('timestamps', true);

module.exports = mongoose.model('student', studentSchema);
