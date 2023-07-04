const { authSchema, subscriptionSchema } = require('./users');
const { contactAddSchema, contactUpdateFavoriteSchema } = require('./contacts');

module.exports = {
  authSchema,
  subscriptionSchema,
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
