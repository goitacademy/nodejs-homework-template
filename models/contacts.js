const fs = require('fs/promises')
const path = require('node:path');

const { randomUUID } = require('crypto')

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(({ id }) => id === contactId)

  return contact || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;

  // for sending to frontend
  const contact = allContacts[index];

  const newListOfContacts = allContacts.filter(({ id }) => id !== contactId);

  updateContactsDataBase(newListOfContacts);
  return contact;
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const id = randomUUID()
  const contact = { id, ...body };
  const newListOfContacts = [...allContacts, contact];

  updateContactsDataBase(newListOfContacts);
  return (contact);
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;

  const contact = { id: contactId, ...body };
  allContacts[index] = contact;

  updateContactsDataBase(allContacts);
  return contact;
}

const updateContactsDataBase = (data) => {
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
