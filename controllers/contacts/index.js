const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavoriteStatus = require("./updateFavoriteStatus");

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateFavoriteStatus
}