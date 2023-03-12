const { controllerWrapper } = require("../../utils");

const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    listContacts: controllerWrapper(listContacts),
    getContactById: controllerWrapper(getContactById),
    addContact: controllerWrapper(addContact),
    removeContact: controllerWrapper(removeContact),
    updateContact: controllerWrapper(updateContact),
    updateStatusContact: controllerWrapper(updateStatusContact),
  };