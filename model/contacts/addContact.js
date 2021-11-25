const fs = require('fs/promises');
const contactsPath = require('../../helpers/contactsPath');
const listContacts = require('./listContacts');

const addContact = async (name, email, phone) => {
  const randomId = Math.floor(Math.random() * (500 - 50) + 1);
  const contactsData = await listContacts();
  const newContact = { id: randomId, name, email, phone }
  contactsData.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2), 'utf-8')

  return contactsData;
};

module.exports = addContact;