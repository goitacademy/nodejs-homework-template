const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./src/routes/api/contactsRouter');
const authRouter = require('./src/routes/api/authRouter');
const { errorHandler } = require('./src/helpers/apiHelpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

module.exports = app;
