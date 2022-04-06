const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const postContact = require('./postContact');
const putContact = require('./putContact');
const deleteContact = require('./deleteContact');
const patchFavorite = require('./patchFavorite');

module.exports = {
    getContacts,
    getContactById,
    postContact,
    putContact,
    deleteContact,
    patchFavorite
}