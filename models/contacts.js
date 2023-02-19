const { readFileSync, writeFileSync } = require('fs');
const { findIndex } = require('lodash');
const { v4 } = require('uuid');
const path = require('path');
const contactsPath = path.resolve('models/contacts.json');

const getContacts = async () => {
  const data = readFileSync(contactsPath, 'utf-8');
  return JSON.parse(data) || [];
};
const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const lookedContact = contacts.find((contact) => contact.id === contactId);
  return lookedContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  writeFileSync(contactsPath, JSON.stringify(newContacts));
  const removedContact = contacts.find((contact) => contact.id === contactId);

  return removedContact.id || null;
};

const addContact = async ({ name, email, phone }) => {
  const contact = {
    name,
    email,
    phone,
    id: v4(),
  };
  const contacts = await getContacts();
  contacts.push(contact);
  writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

  return contact;
};

const updateContact = async (id, data) => {
  const contacts = await getContacts();

  const contactIndex = findIndex(contacts, { id });
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { ...contacts[contactIndex], ...data };

  writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
