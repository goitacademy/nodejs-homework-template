const rateLimit = require("express-rate-limit");
const { HttpCode } = require("../config/constans");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TW0_MANY_REQUESTS).json({
      status: "unauthorized",
      code: HttpCode.TW0_MANY_REQUESTS,
      message: "Two many requests!",
    });
  },
});

module.exports = limiter;
