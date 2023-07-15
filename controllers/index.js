const { contactList } = require("./contacts/contactList");
const { getContactById } = require("./contacts/getContactById");
const { addContact } = require("./contacts/addContact");
const { updateContact } = require("./contacts/updateContact");
const { updateStatusContact } = require("./contacts/updateStatusContact");
const { removeContact } = require("./contacts/removeContact");
const { register } = require("./auth/register");
const { login } = require("./auth/login");
const { getCurrent } = require("./auth/current");
const { logout } = require("./auth/logout");

module.exports = { contactList, getContactById, addContact, updateContact, updateStatusContact, removeContact, register, logout, getCurrent, login };
