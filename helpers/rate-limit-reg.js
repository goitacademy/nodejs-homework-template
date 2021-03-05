const rateLimit = require('express-rate-limit');

const { HttpCode } = require('./constants');

const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad Request',
      message: 'Too many registrations from your IP, please try again later.',
    });
  },
});

module.exports = {
  createAccountLimiter,
};
