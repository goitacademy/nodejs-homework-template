const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const uriDb = process.env.DB_HOST;

const connection = async () => {
	try {
		await mongoose.connect(uriDb, { dbName: "db-contacts" });
		console.log("Database connection successful");

		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};
connection();
