const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	section: [{ type: Schema.Types.ObjectId, ref: 'section' }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('class', classSchema);
