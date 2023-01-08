const { getContactsController } = require("./getContactsController");
const { getContactByIdController } = require("./getContactByIdController");
const { removeContactController } = require("./removeContactController");
const { addContactController } = require("./addContactController");
const { updateContactController } = require("./updateContactController");

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
};
