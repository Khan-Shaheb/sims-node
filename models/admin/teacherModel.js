const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('teacher', teacherSchema);
