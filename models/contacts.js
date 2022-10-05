const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { rewriteJsonContacts } = require('../utils');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
};

const getContactById = async contactId => {
  const contactList = await listContacts();
  const result = contactList.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async contactId => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contactList.splice(index, 1);
  rewriteJsonContacts(contactsPath, contactList);
  return removedContact;
};

const addContact = async data => {
  const contact = {
    id: uuidv4(),
    ...data,
  };

  const contactList = await listContacts();
  contactList.push(contact);
  rewriteJsonContacts(contactsPath, contactList);
  return contact;
};

const updateContact = async (contactId, data) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return null;
  }

  contactList[index] = { ...contactList[index], ...data };
  rewriteJsonContacts(contactsPath, contactList);

  return contactList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
