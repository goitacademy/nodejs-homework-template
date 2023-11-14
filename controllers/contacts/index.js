const getContacts = require('./get');
const getContactById = require('./getById');
const createContact = require('./post');
const updateContact = require('./put');
const updateStatusContacts = require('./path');
const removeContact = require('./del');

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContacts,
  removeContact,
};
