const { HttpError, ctrlWrapper } = require('../../helpers');
const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');
const removeContact= require('./removeContact ');
const register = require('../auth/register');
const login = require('../auth/login');
const getCurrent = require('../auth/getCurrent');
const logout = require('../auth/logout');
const updateSubscriptionUser = require('../auth/updateSubscriptionUser');

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContactt: ctrlWrapper(removeContact),
};