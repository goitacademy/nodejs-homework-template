const { Contact, contactSchemaJoi, favoriteSchemaJoi } = require("./contact");

const { joiAuthSchema, User } = require("./users");

module.exports = {
  Contact,
  contactSchemaJoi,
  favoriteSchemaJoi,
  User,
  joiAuthSchema,
};