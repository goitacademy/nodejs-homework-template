const fs = require('fs/promises');
const {randomUUID} = require('crypto');
const contactsPath = require('./contactsPath');
const listContacts = require('./listContacts');

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {...body, id: randomUUID()};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;
