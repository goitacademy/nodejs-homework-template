const { contactSchema } = require("./contacts");
const { Contact } = require("./contacts");
const { favoriteContactSchema } = require("./contacts");

module.exports = {
  contactSchema,
  favoriteContactSchema,
  Contact,
};
