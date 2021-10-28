const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const deleteContact = require('./deleteContact');
const postContact = require('./postContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
  updateStatusContact,
};
