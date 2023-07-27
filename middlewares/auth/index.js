const { checkSignupUserData, protect, allowFor } = require('./authMiddlewares');

module.exports = {
  protect,
  allowFor,
  checkSignupUserData,
};
