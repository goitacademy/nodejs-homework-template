const { uuid } = require('uuidv4');
const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, './contacts.json');

// Добавить функцию fs для чтения

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
}

async function getContactById(contactId) {
  const result = await listContacts();
  const contactSelected = result.find(item => item.id === String(contactId));
  return contactSelected;
}

async function removeContact(contactId) {
  const result = await listContacts();
  const newContact = result.filter(contact => contact.id !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));

  return newContact;
}

async function addContact(data) {
  const newContact = { id: uuid(), ...data };

  const result = await fs.readFile(contactsPath);
  const contactsParsed = JSON.parse(result);
  const newContactList = [...contactsParsed, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return newContactList;
}

async function updateContactById(contactId, body) {
  const result = await listContacts();
  const idx = result.findIndex(it => it.id === String(contactId));
  if (idx === -1) {
    return null;
  }
  result[idx] = { id: String(contactId), ...body };

  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return result[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
