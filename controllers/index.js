const {
  getContacts,
  getContactByIdController,
  postContact,
  putContact,
  patchContact,
  deleteContact,
} = require("./contacts/index");

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};
