const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("./contacts");

const {registrationController, loginController} = require('./users');

module.exports = {
    registrationController,
    loginController,
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
