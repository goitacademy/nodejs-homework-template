const { HTTP_CODE } = require('./constants');

const subscriptionGuard = (subscription) => (req, res, next) => {
  const userType = req.user.subscription;
  if (userType !== subscription) {
    return res.status(HTTP_CODE.FORBIDDEN).json({
      Status: `${HTTP_CODE.FORBIDDEN} Forbidden`,
      message: 'Access denied',
    });
  }
  return next();
};

module.exports = subscriptionGuard;
