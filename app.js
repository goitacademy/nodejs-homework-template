const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api');

// import middlewares
const { notFoundMiddleware } = require('./middlewares/notFound');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// parse application/json
app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());

app.use('/api', contactsRouter());

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
