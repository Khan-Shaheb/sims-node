const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
	fullName: {
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
	gender: {
		type: String,
	},
	dob: {
		type: String,
	},
	joinDate: {
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
