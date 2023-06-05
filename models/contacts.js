// const fs = require('fs/promises')
const contacts = require("./contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
