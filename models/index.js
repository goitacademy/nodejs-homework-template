const { Contact, contactJoiSchema, contactFavoriteSchema } = require('./contact');
const {
  User,
  registerJoiSchema,
  loginJoiSchema,
  updateSubscriptionJoiSchema,
} = require('./userAuth');

module.exports = {
  Contact,
  contactJoiSchema,
  contactFavoriteSchema,
  User,
  registerJoiSchema,
  loginJoiSchema,
  updateSubscriptionJoiSchema,
};