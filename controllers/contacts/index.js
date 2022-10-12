const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactsById');
const addNewContacts = require('./addContact');
const deleteContact = require('./deleteContact');
const contactUpdate = require('./contactUpdate');
const upDateFavorite = require('./upDateFavorite');

module.exports = {
  getAllContacts,
  getContactById,
  addNewContacts,
  deleteContact,
  contactUpdate,
  upDateFavorite,
};
