const getAllContacts = require("./getAllContacts")
const getContactById = require("./getContactById")
const addContact = require("./addContact")
const removeContact = require("./removeContact")
const updateContact = require("./updateContact")
const updateContactFavorite = require("./updateContactFavorite")

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactFavorite,
}