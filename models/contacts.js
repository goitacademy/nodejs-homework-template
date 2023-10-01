const fs = require('fs/promises')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('models','contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(contact => contactId === contact.id) || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = contacts.filter(contacts => contacts.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return getContactById(contactId);
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(item => (item.id = contactId));
  if (indexContact === -1)
    return null;
  contacts[indexContact] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
