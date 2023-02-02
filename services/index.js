const { listContacts } = require("./contactsService/listContacts");
const { getContactById } = require("./contactsService/getContactById");
const { removeContact } = require("./contactsService/removeContact");
const { addContact } = require("./contactsService/addContact");
const { updateContact } = require("./contactsService/updateContact");
const { createUser } = require("./userService/createUser");
const { findUser } = require("./userService/findUser");
const { findAndUpdate } = require("./userService/findAndUpdate");

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact, 
    createUser, 
    findUser, 
    findAndUpdate,
}