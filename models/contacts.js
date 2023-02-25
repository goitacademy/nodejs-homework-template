

const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactFilter = contacts.filter((contact) => contact.id === contactId);
  return contactFilter;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactFilter = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactFilter, null, 4));
  return contactFilter;
}

async function addContact({ name, email, phone }) {
  const newContact = { id: uuidv4(), name, email, phone };
  const contacts = await listContacts();
  const contactsAdd = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(contactsAdd, null, 4));
  return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], name, email, phone };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
