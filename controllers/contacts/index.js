const addContact = require("./addContact");
const getContactById = require("./getContactById");
const listContact = require("./listContact")
const removeContact = require("./removeContact")
const updateContact = require("./updateContact")
const updateContactStatus = require('./updateContactStatus')

module.exports = {
    addContact,
    getContactById,
    listContact,
    removeContact,
    updateContact,
    updateContactStatus
}