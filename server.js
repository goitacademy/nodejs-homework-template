const mongoose = require("mongoose");
const app = require("./app");

const colors = require("colors");

const { DB_HOST, PORT = 5050 } = process.env;

mongoose.set("strictQuery", true);

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`Server running. Use our API on port: ${PORT}`.blue.bold)
		);
		console.log("Database connection successful".green.bold);
	})
	.catch((e) => {
		console.log(e.message.red.bold);
		process.exit(1);
	});
