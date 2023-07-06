const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const uriDb = process.env.DB_HOST;
const port = process.env.PORT || 3003;

mongoose.set("strictQuery", true);

mongoose
	.connect(uriDb)
	.then(() => {
		console.log("Database connection successful");

		app.listen(port, () => {
			console.log(`Server running. Use our API on port: ${port}`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
