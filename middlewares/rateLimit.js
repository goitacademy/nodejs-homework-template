const rateLimit = require('express-rate-limit');
const { HTTP_STATUS_CODE, STATUS } = require('../helpers/constants');

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    handler: (req, res, next) => {
      return res.status(HTTP_STATUS_CODE.TOO_MANY_REQUESTS).json({
        status: STATUS.ERROR,
        code: HTTP_STATUS_CODE.TOO_MANY_REQUESTS,
        message: 'Too many requests, please try again later.',
      });
    },
  });
};

module.exports = limiter;
