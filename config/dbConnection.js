const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		});
		console.log('Database connection successfully');
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
