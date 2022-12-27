const listContactsController = require('./listAllContacts');
const getContactController = require('./getContact');
const addContactController = require('./addContact');
const deleteContactController = require('./deleteContact');
const updateContactController = require('./updateContact');
const updateContactStatusController = require('./updateContactStatus');

module.exports = {
  listContactsController,
  getContactController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
};
