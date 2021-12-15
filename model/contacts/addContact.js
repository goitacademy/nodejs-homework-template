const { v4 } = require('uuid');
const fs = require('fs').promises;
const contactsPath = require('./contactPath');
const listContacts = require('./listContacts');

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log('Контакт добавлен');
  return newContact;
};
module.exports = addContact;
