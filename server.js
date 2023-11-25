const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const { createFolderIfNotExist, uploadDir } = require('./middlewares/upload');


const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.DB_CONTACTS_URL, {
	dbName: 'db-contacts',
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connection
	.then(() => {
		console.log('\nDatabase connection successful');
		app.listen(PORT, () => {
			createFolderIfNotExist(uploadDir);
			console.log(`Server running. App listens on port ${PORT}`);
		});
	})
	.catch(err => {
		console.error(`\nServer not running. Error message: [${err}]\n`);
		process.exit(1);
	});
