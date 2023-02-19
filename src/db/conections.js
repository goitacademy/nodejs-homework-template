const mongoose = require("mongoose");

async function mongooseConection() {
	mongoose.set("strictQuery", true);
	return await mongoose.connect(
		process.env.MongoDBURL,
		{ useNewUrlParser: true },
		err => {
			if (err) {
				console.log("Failed conection to DataBase");
				process.exit(1);
			} else {
				console.log("Database connection successful");
			}
		}
	);
}

module.exports = {
	mongooseConection,
};
