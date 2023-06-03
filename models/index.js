const { Contact } = require("./contact");
const { contactAddSchema } = require("./contact");
const { updateFavoriteSchema } = require("./contact");
const { schemas } = require("./user");
const { User } = require("./user");

module.exports = {
  schemas,
  User,
  Contact,
  contactAddSchema,
  updateFavoriteSchema,
};
