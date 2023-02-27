const { V4MAPPED } = require('dns');
const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const updateContacts = require('./updateContacts');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact ? contact : null;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = allContacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return allContacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id, ...data };
  await updateContacts(allContacts);

  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
