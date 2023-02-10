const { listContacts } = require("../contactsService/listContacts");
const { getContactById } = require("../contactsService/getContactById");
const { removeContact } = require("../contactsService/removeContact");
const { addContact } = require("../contactsService/addContact");
const { updateContact } = require("../contactsService/updateContact");

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}