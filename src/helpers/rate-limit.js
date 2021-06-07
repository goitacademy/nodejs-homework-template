const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Too many requests. Please, try again later!`,
    });
  },
});

module.exports = { createAccountLimiter };
