// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

const listContacts = require("./listContacts");
const getContactById = require("./getContactsById");
const removeContact = require("./removeContact");
const updateById = require("./updateById");
const addContact = require("./addContact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
