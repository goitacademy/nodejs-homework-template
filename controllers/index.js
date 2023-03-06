const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("./contacts");

const {
  registrationController,
  loginController,
  logoutController,
} = require("./users");

module.exports = {
  registrationController,
  loginController,
  logoutController,
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
