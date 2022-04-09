const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateFavorite = require('./updateFavorite');
const removeContact = require('./removeContact');

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    updateFavorite,
    removeContact,
};