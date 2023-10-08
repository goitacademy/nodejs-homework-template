const {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('./userSchema');
const { contactSchema, updateFavoriteSchema } = require('./contactSchema');

module.exports = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
  contactSchema,
  updateFavoriteSchema,
};
