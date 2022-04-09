const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const { HTTP_STATUS_CODE, STATUS, MESSAGES } = require('./helpers/constants');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(limiter(15 * 60 * 1000, 100)); // 15 minutes
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: STATUS.ERROR,
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: "Use routes: '/api/contacts' or '/api/auth/' or '/api/users'",
    payload: 'Not found',
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: STATUS.FAIL,
    code: err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    message: err.message,
    payload: MESSAGES.INTERNALSERVERERROR,
  });
});

module.exports = app;
