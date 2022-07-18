const listContacts = require('./listContacts');
const getContactsById = require('./getContactById');
const addContact = require('./addContact');
const deleteContactById = require('./deleteContactById');
const updateContact = require('./updateContact');

const contactsActions = {
    listContacts,
    getContactsById,
    addContact,
    deleteContactById,
    updateContact
}

module.exports = contactsActions;