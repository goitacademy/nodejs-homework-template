const rateLimit = require("express-rate-limit");

const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 5, //макс запросов
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "To many register attempts, please try again later",
    });
  },
});

module.exports = { createAccountLimiter };
