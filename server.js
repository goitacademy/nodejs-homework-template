const app = require("./app");
const mongoose = require("mongoose");
// const fs = require("fs/promises")
// const multer = require("multer");
require("dotenv").config();
const PORT = 3000;

const connection = mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connection
	.then(() => {
		console.log("Database connection successful");
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(`Connection Error : ${err}`);
		process.exit(1);
	});
