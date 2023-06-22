const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const existingContact = contacts.find((item) => item.id === contactId);

  if (!existingContact) {
    return null;
  }

  const result = contacts.filter((item) => item.id !== contactId);

  await updateContacts(result);

  return result;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
