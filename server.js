const app = require("./app");
const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

const { DB_HOST, PORT = 5000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
	.connect(DB_HOST)
	.then(() => {
		console.log("Database connection successful".magenta);
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`.cyan.bold);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
