const rateLimit = require("express-rate-limit");

const { HTTP_STATUS_CODE } = require("../libs/constant");

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
      return res.status(HTTP_STATUS_CODE.TOO_MANY_REQUESTS).json({
        status: "error",
        code: HTTP_STATUS_CODE.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later",
      });
    },
  });
};

module.exports = limiter;
