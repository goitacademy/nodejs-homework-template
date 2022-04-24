const fs = require('fs').promises;
const path = require('path');
const CreateError = require('http-errors');
const { findIndex, generateNewId } = require('../services/services,js');

const contactsPath = path.resolve('./models/contacts.json');

// CRUD - C

const addContact = async body => {
  const contacts = await listContacts();
  const id = generateNewId(contacts);
  const newContacts = [...contacts, { id, ...body }];

  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return { id, ...body };
  } catch (error) {
    throw new CreateError.BadGateway('Contacts data not found');
  }
};

// CRUD - R

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    throw new CreateError.BadGateway('Contacts data not found');
  }
};

const getContactById = async id => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id);
};

// CRUD - U

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = findIndex(contacts, id);
  if (!index) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (error) {
    throw new CreateError.BadGateway('Contacts data not found');
  }
};

// CRUD - D

const removeContact = async id => {
  const contacts = await listContacts();
  const index = findIndex(contacts, id);

  if (!index) return false;

  contacts.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  } catch (error) {
    throw new CreateError.BadGateway('Contacts data not found');
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
