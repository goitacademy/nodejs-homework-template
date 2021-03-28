const rateLimit = require("express-rate-limit");
const { HttpCode } = require("../helpers/constants");

const regLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Too many requests. Try again later",
    });
  },
});

module.exports = {
  regLimiter,
};
