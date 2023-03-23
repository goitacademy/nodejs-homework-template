const {
  Contact,
  contactSchemaJoi,
  contactSchemaFavorite,
} = require("./contact");

const {
  User,
  registerSchemaJoi,
  loginSchemaJoi,
  updateSubscriptionSchemaJoi,
} = require("./user");

module.exports = {
  Contact,
  contactSchemaJoi,
  contactSchemaFavorite,
  User,
  registerSchemaJoi,
  loginSchemaJoi,
  updateSubscriptionSchemaJoi,
};
