const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { contactsRouter } = require('./routes/api/contactsRouter');
const { authRouter } = require('./routes/api/authRouter');
const { userRouter } = require('./routes/api/userRouter');
const { errorHandler } = require('./helpers/errorHandler');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);
app.use(errorHandler);

module.exports = app;
