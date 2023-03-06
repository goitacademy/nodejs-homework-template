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
  findUserById,
  addNewUser,
  updateUser,
  removeToken,
} = require('./usersService');


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    findUserInDb,
    findUserById,
    addNewUser,
    updateUser,
    removeToken,
  };