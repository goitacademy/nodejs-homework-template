const rateLimit = require("express-rate-limit");
const { StatusCode } = require("../config/constants");

const TOO_MANY_REQUESTS = StatusCode.TOO_MANY_REQUESTS;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  handler: (_req, res, _next) => {
    return res.status(TOO_MANY_REQUESTS).json({
      status: "error",
      code: TOO_MANY_REQUESTS,
      message: "Too many requests, please try again later!",
    });
  },
});

module.exports = limiter;