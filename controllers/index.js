const getContacts = require("./getContacts.js");
const getContactById = require("./findContact.js");
const removeContact = require("./removeContact.js");
const addContact = require("./addContact.js");
const updateContact = require("./updateContact")

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}
