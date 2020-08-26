const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classRoomSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	studentCount: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('classRoom', classRoomSchema);
