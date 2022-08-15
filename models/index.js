const addContact = require("./addContact");
const getContactById = require("./getContactById");
const listContacts = require("./listContacts");
const removeContact = require("./removeContact");
const updateContact = require('./updateContact');

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};