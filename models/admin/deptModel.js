const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
	dept_name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('department', departmentSchema);
