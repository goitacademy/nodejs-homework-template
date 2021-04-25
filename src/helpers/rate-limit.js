const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 2 requests
  handler: (req, res, nexy) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "С вашего IP исчерпал лимит создания аккаунтов за час",
    });
  },
});

module.exports = { createAccountLimiter };
