const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
