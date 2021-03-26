const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');
const {
  fiftinMinutes,
  sixtyMinutes,
  maxCreateAccountLimiter,
  maxLimiter,
} = require('../config/constant');

const createAccountLimiter = rateLimit({
  windowMs: sixtyMinutes, // 60 minutes
  max: maxCreateAccountLimiter, // limit each IP to 2 requests per windowMs
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'From one ip no more than two registrations per hour.',
    });
  },
});

const limiter = rateLimit({
  windowMs: fiftinMinutes, // 15 minutes
  max: maxLimiter, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many request, plase try again later.',
    });
  },
});

module.exports = { createAccountLimiter, limiter };
