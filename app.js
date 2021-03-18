const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const userRouter = require('./routes/api/users');
const helmet = require('helmet');
const { limiter } = require('./helpers/rate-limit');
const { HttpCode } = require('./helpers/constans');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(limiter);
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Use api on routes: /api/contacts',
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
    data: 'Internal Server Error',
  });
});

module.exports = app;
