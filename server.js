import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js";

const { DB_HOST, PORT } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log("Database connection successful");
		});
	})
	.catch((error) => {
		console.log(error.message);
		process.emit(1);
	});
