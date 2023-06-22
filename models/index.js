const { Contact, bodyValidator, favoriteValidator } = require("./contact");
const {User, userValidator, subscriptionValidator} = require('./user')

module.exports = {
  Contact,
  bodyValidator,
  favoriteValidator,
  User,
  userValidator,
  subscriptionValidator
};
