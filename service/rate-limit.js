const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const createAccountLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100, // limit each IP to 20 requests per windowMs
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Too many requests. Please try later.',
    });
  },
});

module.exports = { createAccountLimiter };
