const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const patchContactById = require('./patchContactById');

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    patchContactById
};