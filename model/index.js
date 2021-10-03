const crypto = require('crypto');
const DB = require('./db.js');
const db = new DB('contacts.json');

const listContacts = async () => {
  return await db.read();
};

const getContactById = async contactId => {
  const contacts = await db.read();
  const contact = contacts.find(({ id }) => String(id) === contactId) || null;

  return contact;
};

const removeContact = async contactId => {
  const contacts = await db.read();
  const index = contacts.findIndex(({ id }) => String(id) === contactId);

  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  await db.write(contacts);

  return deletedContact;
};

const addContact = async body => {
  const contacts = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  contacts.push(newContact);
  await db.write(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex(({ id }) => String(id) === contactId);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...body };
  await db.write(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
