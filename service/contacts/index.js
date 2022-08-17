const addContact = require("./addContact");
const deleteContact = require('./deleteContact');
const getAllContacts = require('./getAllContacts');
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateContactFavorite = require("./updateContactFavorite");

module.exports = {
    addContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
    updateContactFavorite
}
