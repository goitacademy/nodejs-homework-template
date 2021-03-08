const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many registrations, please try again later.',
    });
  },
});

module.exports = { createAccountLimiter };
