const fs = require("fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "/contacts.json");
const crypto = require("node:crypto");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => (item.id = contactId));
  if (indexContact === -1) {
    return null;
  }
  contacts[indexContact] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexContact];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return result;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
