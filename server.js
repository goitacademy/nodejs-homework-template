require("dotenv").config({ path: "./.env" });
const app = require("./app");
const mongoose = require("mongoose");
const connection = mongoose.connect(
	process.env.MONGO_URL || "mongodb://localhost:27017/contacts"
);

connection
	.then(() => {
		app.listen(process.env.PORT, function () {
			console.log(
				`Server running. Use our API on port: ${process.env.PORT}`
			);
		});
	})
	.catch(err =>
		console.log(`Server not running. Error message: ${err.message}`)
	);
