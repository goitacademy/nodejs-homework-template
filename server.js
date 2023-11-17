const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, function () {
			console.log(`Database connection successful. Use our API on port: ${PORT}`);
		});
	})
	.catch(error => {
		console.log(`Server not running. Error message: ${error.message}`);
		process.exit(1);
	});
