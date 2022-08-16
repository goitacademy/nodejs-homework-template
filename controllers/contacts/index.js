const getAllContacts = require('./getAllContacts'); 
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateContactFavorite = require("./updateContactFavorite");

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateContactFavorite
}
