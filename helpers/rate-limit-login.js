const rateLimit = require("express-rate-limit");
const { HttpCode } = require("../config/constants");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  handler: (req, res, next) => {
    return res.status(HttpCode.TO_MANY_REQUESTS).json({
      status: "Error",
      code: HttpCode.TO_MANY_REQUESTS,
      message: "To many requests",
    });
  },
});

module.exports = limiter;
