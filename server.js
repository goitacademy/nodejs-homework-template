const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose.Promise = global.Promise;

const connectionDB = mongoose.connect(DB_HOST);

connectionDB
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
