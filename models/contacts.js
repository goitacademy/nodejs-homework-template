const fs = require('fs/promises');
const path = require('path');
const { uid } = require('uid');

const contactsPath = path.resolve('./models/contacts.json');

// =========== Contacts List ===========
const listContacts = async () => {
  const contacts = await readFile(contactsPath);

  if (!contacts) {
    return null;
  }

  return contacts;
};

// =========== Get Contacts By Id ===========
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find(({ id }) => id === contactId.toString());

  if (!foundContact) {
    return null;
  }

  return foundContact;
};

// =========== Remove Contacts ===========
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const foundIndex = contacts.findIndex(({ id }) => id === contactId.toString());

  if (foundIndex < 0) {
    return null;
  }

  const removedContact = contacts.splice(foundIndex, 1);

  writeFile(contactsPath, contacts);

  return removedContact;
};

// =========== Add Contacts ===========
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uid(),
    ...body,
  };

  contacts.push(newContact);
  writeFile(contactsPath, contacts);

  return newContact;
};

// =========== Update Contacts ===========
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const foundIndex = contacts.findIndex(({ id }) => id === contactId);

  if (foundIndex < 0) {
    return null;
  }

  contacts[foundIndex] = {
    ...contacts[foundIndex],
    ...body,
  };
  writeFile(contactsPath, contacts);

  return contacts[foundIndex];
};

// =========== Read File ===========
const readFile = async (filePath) => {
  const data = (await fs.readFile(filePath, 'utf8'));
  return JSON.parse(data);
};

// =========== Write File ===========
const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
