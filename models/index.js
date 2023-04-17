const { Contact } = require("./contact");
const { addSchema, putSchema, updateFavoriteSchema } = require("./contact");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

module.exports = {
  Contact,
  addSchema,
  putSchema,
  updateFavoriteSchema,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
