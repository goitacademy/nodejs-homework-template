const fs = require('fs/promises');
const path = require('path');
const joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const {
  isPhoneInContacts,
  isEmailInContacts,
  writeData,
  readData,
  searchContactById,
  editContact,
} = require('./helpers.js');

const schema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),

  email: joi.string().email({ minDomainSegments: 2 }).required(),

  phone: joi
    .string()
    .pattern(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)
    .required(),
});

const listContacts = () => readData();

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return await contacts.find(({ id }) => id.toString() === contactId.toString());
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = await getContactById(contactId);

  if (!removedContact) {
    return null;
  }
  const refreshedContacts = contacts.filter(({ id }) => id.toString() !== contactId.toString());

  await writeData(refreshedContacts);

  return removedContact;
};

const addContact = async (body) => {
  const { error } = schema.validate(body);

  if (error) {
    const message = error.details[0].message;
    return { error: message };
  }

  const newContact = { id: uuidv4(), ...body };
  const contacts = await listContacts();

  contacts.push(newContact);

  await writeData(contacts);

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  if (contactId === void 0) {
    return null;
  }

  const contacts = await listContacts();
  const searchedIndex = await contacts.findIndex(({ id }) => id.toString() === contactId.toString());

  if (searchedIndex === -1) {
    return null;
  }

  contacts[searchedIndex] = editContact(contacts[searchedIndex], { name, email, phone });

  await writeData(contacts);

  return contacts[searchedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
