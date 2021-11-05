const rateLimit = require("express-rate-limit");
const { HttpCode } = require('../config/constants');
const {
  TOO_MANY_REQUESTS
} = HttpCode;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  handler: (req, res, next) =>{res.status(TOO_MANY_REQUESTS).json({
    status: 'error',
    code: TOO_MANY_REQUESTS,
    message: 'Too many requests',
  });

  }
});

module.exports = limiter