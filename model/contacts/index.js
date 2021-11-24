const fs = require("fs/promises");
const path = require("path");

const listContacts = require("./listContacts.js");
const getContactById = require("./getContactById.js");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
