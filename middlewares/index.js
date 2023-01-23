const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  signupValidation,
  loginValidation,
  updateSubscriptionValidation,
} = require('./validationMiddleware');

const { checkAuth } = require('./checkAuth');

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  signupValidation,
  loginValidation,
  checkAuth,
  updateSubscriptionValidation,
};
