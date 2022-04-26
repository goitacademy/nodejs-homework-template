const fs = require('fs').promises;
const path = require('path');
const { findIndex, generateNewId } = require('../helpers').helpers;

const contactsPath = path.resolve('./models/contacts.json');

// CRUD - C

const addContactbyId = async body => {
  const contacts = await listContacts();
  const id = generateNewId(contacts);
  const newContacts = [...contacts, { id, ...body }];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return { id, ...body };
};

// CRUD - R

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContactById = async id => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id);
};

// CRUD - U

const changeContact = async (id, body) => {
  const contacts = await listContacts();
  const index = findIndex(contacts, id);
  if (!index) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

// CRUD - D

const removeContact = async id => {
  const contacts = await listContacts();
  const index = findIndex(contacts, id);

  if (!index) return false;

  contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return true;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContactbyId,
  changeContact,
};
