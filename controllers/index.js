const { contactList } = require("./contactList");
const { getContactById } = require("./getContactById");
const { addContact } = require("./addContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");
const { removeContact } = require("./removeContact");

module.exports = { contactList, getContactById, addContact, updateContact, updateStatusContact, removeContact };
