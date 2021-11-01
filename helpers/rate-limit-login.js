const rateLimit = require("express-rate-limit");
const { HttpCode, RareLimits } = require("../config/constants");

const limiter = rateLimit({
  windowMs: RareLimits.WINDOW_MS, // 1 minute
  max: RareLimits.MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: "error",
      cod: HttpCode.TOO_MANY_REQUESTS,
      message: "Too many requests, please try again later.",
    });
  },
});

module.exports = limiter;
