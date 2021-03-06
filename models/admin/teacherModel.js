const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
	full_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
	},
	dept: {
		type: Schema.Types.ObjectId,
		ref: 'department',
	},
	phone: {
		type: String,
	},
	gender: {
		type: String,
	},
	dob: {
		type: String,
	},
	joining_date: {
		type: String,
	},
	religion: {
		type: String,
	},
	address: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('teacher', teacherSchema);
