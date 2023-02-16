const {
  getContacts,
  getContactByIdController,
  postContact,
  putContact,
  patchContact,
  deleteContact,
} = require('./contacts/index');

const auth = require('./auth/index');
const users = require('./users/index');

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
  auth,
  users,
};
