const { getContacts } = require('./getContacts');
const { getContactByIdController } = require('./getContactByIdController');
const { postContact } = require('./postContact');
const { putContact } = require('./putContact');
const { patchContact } = require('./patchContact');
const { deleteContact } = require('./deleteContact');

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
  putContact,
  patchContact,
  deleteContact,
};
