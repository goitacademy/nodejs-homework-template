const rateLimit = require("express-rate-limit");

//to avoid repeated requests from one API

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration, // 15 minutes
    max: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (_, res) => {
      return res.status(429).json({
        status: "error",
        code: 429,
        message: "Too many requests, please try again later",
      });
    },
  });
};
module.exports = limiter;
