const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('./contactsService');

const {
  findUserInDb,
  addNewUser,
} = require('./usersService');


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    findUserInDb,
    addNewUser,
  };