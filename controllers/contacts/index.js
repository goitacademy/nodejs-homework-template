const { updateContact } = require("./controller.updateContact");
const { removeContact } = require("./controller.removeContact");
const { listContacts } = require("./controller.listContacts");
const { getContactById } = require("./controller.getContactById");
const { addContact } = require("./controller.addContact");

module.exports = {
  updateContact,
  removeContact,
  listContacts,
  getContactById,
  addContact,
};
