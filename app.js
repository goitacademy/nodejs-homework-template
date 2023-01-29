const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const routeContacts = require('./routes/api/contacts');
const routeUsers = require('./routes/api/users')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", routeContacts); 
app.use("/api/users", routeUsers);


app.use((req, res, next) => {
	res.status(404).json({ message: 'Not found' })
	next();
});

app.use((error, req, res, next) => {
	if (error.status) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
	next();
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message })
	next();
});

module.exports = app;