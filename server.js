const mongoose = require("mongoose");

const { DB_HOST } = process.env();

const app = require("./app");

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
