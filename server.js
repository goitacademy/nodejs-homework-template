const mongoose = require("mongoose");
const app = require('./app');

const DB_HOST = "mongodb+srv://Oleksiy:6oXvPOtaXTrg6hSQ@cluster0.xb1mzbn.mongodb.net/contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
	.then(() => {
		console.log("Database connect success")
		app.listen(3000);
	}).catch(error => {
		console.log(error.message);
		process.exit(1);
	});

