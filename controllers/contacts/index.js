const listContact = require('./getAll');
const getContactById = require('./getById');
const addContact = require('./add');
const updateContact = require('./update');
const removeContact = require('./del');
const updateStatusContact = require('./updateStatus');

module.exports = {
  listContact,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
