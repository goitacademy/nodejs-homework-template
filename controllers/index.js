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
  subscriptionChangeController,
} = require("./users");

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserControler,
  subscriptionChangeController,
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
