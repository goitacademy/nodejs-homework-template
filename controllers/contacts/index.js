const getListContacts = require("./getListContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
    getListContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite 
}
