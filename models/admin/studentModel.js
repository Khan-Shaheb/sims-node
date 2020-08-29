const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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

	admissionNo: {
		type: Number,
		required: true,
	},
	regNo: {
		type: Number,
		required: true,
	},
	rollNo: {
		type: Number,
		required: true,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'department',
		required: true,
	},
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
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
	SAddress: {
		type: String,
	},
	SMobile: {
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
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('student', studentSchema);
