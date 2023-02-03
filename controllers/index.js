const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
} = require("./contacts");

const { signupUserController } = require("./auth");

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
  signupUserController,
};
