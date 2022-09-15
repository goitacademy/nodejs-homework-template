const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const { errorHandlerMiddleware } = require('./middleware/errorHandlerMiddleware');
const { NotFoundError } = require('./models/errors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, __, next) => {
  next(new NotFoundError('Requested resource can\'t be found'));
})

app.use(errorHandlerMiddleware);

module.exports = app;
