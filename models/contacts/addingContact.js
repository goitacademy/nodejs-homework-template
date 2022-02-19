const listContacts = require('./listContacts');
const { nanoid } = require('nanoid');
const DB = require('../../db/StorageAdapter');
const db = new DB('contacts.json');

const addingContact = async body => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

module.exports = addingContact;
