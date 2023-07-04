const { Contact, contactAddSchema, contactUpdateFavoriteSchema } = require('./contact');
const User = require('./user');

module.exports = {
  Contact,
  User,
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
