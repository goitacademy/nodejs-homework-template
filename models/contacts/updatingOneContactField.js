const listContacts = require('./listContacts');
const DB = require('../../db/StorageAdapter');
const db = new DB('contacts.json');

const updatingOneContactField = async (id, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;
  if (name) contacts[index].name = name;
  if (email) contacts[index].email = email;
  if (phone) contacts[index].phone = phone;
  await db.write(contacts);
  return contacts[index];
};

module.exports = updatingOneContactField;
