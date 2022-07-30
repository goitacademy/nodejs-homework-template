const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContactById = require('./updateContactById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById,
    updateStatusContact
}