const addContact = require("./route-addContact");
const getContactById = require("./route-getContactById");
const listContacts = require("./route-listContacts");
const removeContact = require("./route-removeContact");
const updateContact = require("./route-updateContact");
const updateStatusContact = require("./route-updateStatusContact");

module.exports = {
    addContact,
    getContactById,
    listContacts,
    removeContact,
    updateContact,
    updateStatusContact
};
