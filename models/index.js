const { Contact, bodyValidator, favoriteValidator } = require("./contact");
const {User, registerValidator, loginValidator} = require('./user')

module.exports = {
  Contact,
  bodyValidator,
  favoriteValidator,
  User,
  registerValidator,
  loginValidator,
};
