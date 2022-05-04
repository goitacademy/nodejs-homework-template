// const fs = require('fs/promises')

const crypto = require('crypto');
const DB = require('./db');
const db = new DB('contacts.json');

const listContacts = async () => {
  return await db.read();
};

const getContactById = async contactId => {
  const contacts = await db.read();
  const [contact] = contacts.filter(({ id }) => id === contactId);

  return contact;
};

const removeContact = async contactId => {
  const contacts = await db.read();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const [result] = contacts.splice(contactIndex, 1);
  await db.write(contacts);

  return [result];
};

const addContact = async body => {
  const contacts = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    isFavorite: false,
    ...body,
  };

  contacts.push(newContact);

  await db.write(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };
  await db.write(contacts);

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
