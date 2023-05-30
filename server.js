<<<<<<< HEAD
<<<<<<< HEAD
const app = require('./app')

app.listen(3560, () => {
  console.log("Server running. Use our API on port: 3560")
})
=======
const mongoose = require('mongoose')
const app = require('./app')

const DB_HOST = "mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts?retryWrites=true&w=majority";

const {PORT = 2900} = process.env;

<<<<<<< HEAD
=======
=======
const mongoose = require('mongoose')
const app = require('./app')

<<<<<<< HEAD
const DB_HOST = "mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts?retryWrites=true&w=majority"

const {PORT = 2900} = process.env;

>>>>>>> master
=======
>>>>>>> master
>>>>>>> b2b353669b449349822edecb08b428e80cfd37d8
mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
		app.listen(3650, () => {
			console.log("Database connection successful");
		});
	})
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
<<<<<<< HEAD
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef
=======
>>>>>>> master
