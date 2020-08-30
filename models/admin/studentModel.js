const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	SFirstName: {
		type: String,
		required: true,
	},
	SLastName: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
	},
	dob: {
		type: String,
	},
	religion: {
		type: String,
	},
	SMobile: {
		type: Number,
	},
	SAddress: {
		type: String,
	},
	SEmail: {
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
	class: {
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
	regNo: {
		type: String,
		required: true,
	},
	rollNo: {
		type: Number,
		required: true,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'department',
	},
	admissionNo: {
		type: Number,
	},
});

studentSchema.set('timestamps', true);

module.exports = mongoose.model('student', studentSchema);
