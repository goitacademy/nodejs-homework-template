const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return result.toString();
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
