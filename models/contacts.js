const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContacts(removedContacts);
  return contacts.find((contact) => contact.id === contactId);
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  index === -1 ? null: contacts[index] = { contactId, ...body };
  await writeContacts(contacts);
  return contacts[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
