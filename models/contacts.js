const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
