const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
} = require("./contacts");

const {
  signupUserController,
  loginUserController,
  logoutUserController,
} = require("./auth");

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
  signupUserController,
  loginUserController,
  logoutUserController,
};
