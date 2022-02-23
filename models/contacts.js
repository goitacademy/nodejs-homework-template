const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = require('./contactsPath');
const updateContacts = require('./updateContacts');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const id = contactId.toString();
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = contactId.toString();
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeContact = async contactId => {
  const id = contactId.toString();
  const contacts = await listContacts();

  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
