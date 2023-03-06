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
  currentUserControler,
} = require("./users");

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserControler,
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
