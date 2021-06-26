const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const router = require('./routes/api/contacts');
const routerUser = require('./routes/api/users');
const { HttpCode } = require('./helpers/contactsHelpers');
const { apiLimit } = require('./config/rate-limit.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
  }),
);
app.use(router);
app.use(routerUser);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/routes/api/contacts`,
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : null,
  });
});

module.exports = app;
