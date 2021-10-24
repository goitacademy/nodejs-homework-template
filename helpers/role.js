const { HttpCode } = require("../config/constans");

const subscription = (subscription) => (req, res, next) => {
  const subscriptionUser = req.user.subscription;

  if (subscriptionUser !== subscription) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: "Access is denied",
    });
  }

  return next();
};

module.exports = subscription;
