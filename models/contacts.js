const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
