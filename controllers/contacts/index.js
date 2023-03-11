const listContacts = require ("./listContacts");
const getById = require("./getById");
const addContact = require ("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateStatusContact = require("./updateStatusContact")

module.exports = {
    listContacts,
    getById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact
}