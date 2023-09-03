const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  contacts[index] = { contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
