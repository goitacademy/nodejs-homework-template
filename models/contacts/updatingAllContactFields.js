const listContacts = require('./listContacts');
const DB = require('../../db/StorageAdapter');
const db = new DB('contacts.json');

const updatingAllContactFields = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = updatingAllContactFields;
