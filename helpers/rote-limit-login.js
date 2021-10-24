const rateLimit = require('express-rate-limit');
const { HttpCode, Limits } = require('../config/constants');
require('dotenv').config();

const limiter = rateLimit({
  windowMs: Limits.REGISTRATION_AND_ENTRANCE_LIMITS, // 15 minutes
  max: Limits.MAX_REGISTRATION_AND_ENTRANCE_LIMITS, // limit each IP to 100 requests per windowMs
  handler: (_req, res, _next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too Many Requests',
    });
  },
});

module.exports = limiter;
