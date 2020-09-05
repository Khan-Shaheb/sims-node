const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
	class_name: {
		type: String,
		required: true,
	},
	sections: [{ type: Schema.Types.ObjectId, ref: 'section', required: true }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('class', classSchema);
