const fs = require('fs').promises;
const path = require('path');
const { generateNewId, findIndex } = require('../helpers/common');

const contactsPath = path.resolve('./models/contacts.json');

// CRUD - C

const addContact = async (body, contacts) => {
  const id = generateNewId(contacts);
  const newContacts = [...contacts, { id, ...body }];

  await whriteDataToFile(newContacts);
  return { id, ...body };
};

// CRUD - R

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContact = async (id, contacts) => {
  return contacts.find(contact => contact.id === id);
};

// CRUD - U

const updateContact = async (id, body, contacts) => {
  const index = findIndex(contacts, id);
  if (!index) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  await whriteDataToFile(contacts);
  return contacts[index];
};

// CRUD - D

const deleteContact = async (id, contacts) => {
  const index = findIndex(contacts, id);

  if (!index) return false;

  contacts.splice(index, 1);

  await whriteDataToFile(contacts);
  return true;
};

const whriteDataToFile = async data => {
  await fs.writeFile(contactsPath, JSON.stringify(data));
};

exports.model = {
  getContacts,
  getContact,
  deleteContact,
  addContact,
  updateContact,
};
