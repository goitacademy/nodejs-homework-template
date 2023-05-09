const mongoose = require('mongoose')
const app = require('./app')

const { PORT = 1900 } = process.env;


mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts?retryWrites=true&w=majority')
  .then(() => {
		app.listen(PORT, () => {
			console.log("Database connection successful");
		});
	})
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
