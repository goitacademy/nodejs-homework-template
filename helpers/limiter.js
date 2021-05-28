const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1500, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too many requests, please try again later.',
    });
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  handler: (req, res, next) => {
    res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too many register requests, please try again later.',
    });
  },
});

//  apply to all requests

module.exports = { limiter, registerLimiter };
