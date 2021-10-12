const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateFavoriteStatus = require('./updateFavoriteStatus');
const filterByFavorite = require('./filterByFavorite');

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavoriteStatus,
    filterByFavorite
}
