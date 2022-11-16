const mongoose = require("mongoose");
const {MONGO_URL} = require("../helpers/envImport")

const connectMongo = async () => {
	try {
		await mongoose.connect(MONGO_URL, {
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
