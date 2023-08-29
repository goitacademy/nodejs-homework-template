const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();
const appRouter = require('./routes/api/index')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

require('./db')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api', appRouter)

app.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Not Found',
		data: 'Not found',
	});
});

app.use((err, _, res, __) => {
	console.log(err.stack);
	res.status(500).json({
		status: 'fail',
		code: 500,
		message: err.message,
		data: 'Internal Server Error',
	});
});


module.exports = app
