const fs = require('fs/promises');
const path = require('path');
// const contacts = require('./contacts.json');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const {
  isPhoneInContacts,
  isEmailInContacts,
  writeData,
  readData,
  searchContactById,
  editContact,
} = require('./helpers.js');
const contactsPath = path.join(__dirname, './contacts.json');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({ minDomainSegments: 2 }),

  phone: Joi.string(),
});

const listContacts = () => readData(contactsPath);

const getContactById = async (contactId) => {
  return await contacts.find(({ id }) => id.toString() === contactId.toString());
};

const removeContact = async (contactId) => {
  const contacts = await readData(contactsPath);
  const removedContact = await searchContactById(contacts, contactId);

  if (!removedContact) {
    return null;
  }
  const refreshedContacts = contactsArr.filter(({ id }) => id.toString() !== contactId.toString());

  await writeData(contactsPath, refreshedContacts);

  return removedContact;
};

const addContact = async (body) => {
  if (Object.keys(body).length < 3 || Object.keys(body).some((field) => body[field] === '')) return null;

  const newContact = { id: uuidv4(), ...body };
  const contacts = await readData(contactsPath);
  contacts.push(newContact);

  await writeData(contactsPath, contacts);

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  if (contactId === void 0) {
    return null;
  }

  const contacts = await readData(contactsPath);
  const searchedIndex = await contacts.findIndex(({ id }) => id.toString() === contactId.toString());

  if (searchedIndex === -1) {
    return null;
  }

  contacts[searchedIndex] = editContact(contacts[searchedIndex], { name, email, phone });

  await writeData(contactsPath, contacts);

  return contacts[searchedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
