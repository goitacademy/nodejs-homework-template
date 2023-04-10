const { getContactsList } = require('./getContactsList');
const { getContact } = require('./getContact');
const { deleteContact } = require('./deleteContact');
const { addContact } = require('./addContact');
const { changeContact } = require('./changeContact');
const { updateStatus } = require('./updateStatus');

module.exports = {
  getContactsList,
  getContact,
  deleteContact,
  addContact,
  changeContact,
  updateStatus,
};
