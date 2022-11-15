const mongoose = require("mongoose");

const connectMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
		});
		console.log("Database connection successful");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = {
	connectMongo,
};
