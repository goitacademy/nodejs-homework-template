const rateLimit = require("express-rate-limit");
const { HttpCode, Limit } = require("../config/constants");

const limiter = rateLimit({
  windowMs: Limit.WINDOW_MS, // 15 minutes
  max: Limit.MAX_LIMITER, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: "error",
      code: HttpCode.TOO_MANY_REQUESTS,
      message: "Too Many Requests",
    });
  },
});

module.exports = limiter;
