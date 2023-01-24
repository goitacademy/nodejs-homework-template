const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const getContacts = require('./getContacts');
const contactsPath = require('./contactsPath');

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  if (!contacts) return null;

  const newContactItem = { name, email, phone, id: randomUUID() };
  const newContacts = [...contacts, newContactItem];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContactItem;
}

module.exports = addContact;
