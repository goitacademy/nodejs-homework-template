const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);

	return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

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
