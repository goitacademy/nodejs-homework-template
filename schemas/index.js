const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('./userSchema');
const { contactSchema, updateFavoriteSchema } = require('./contactSchema');

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  contactSchema,
  updateFavoriteSchema,
};
