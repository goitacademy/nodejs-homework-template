const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const removeContact = require("./removeContact");
const { ctrlWrapper } = require("../../middlewares");

// module.exports = {
//   listContacts,
//   getById,
//   addContact,
//   updateContact,
//   updateStatusContact,
//   removeContact,
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
