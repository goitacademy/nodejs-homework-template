const listContacts = require('./listContacts');
const DB = require('../../db/StorageAdapter');
const db = new DB('contacts.json');

const removingContact = async id => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

module.exports = removingContact;
