const fs = require('fs/promises');

const path = require('path');

const { nanoid } = require('nanoid');
// Шлях до файлу contacts.json
const contactsPath = path.join(__dirname, '/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const idStr = String(contactId);
  const contacts = await listContacts();
  const idContacts = await contacts.find(contact => contact.id === idStr);
  return idContacts || null;
}

async function removeContact(contactId) {
  const idStr = String(contactId);
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === idStr);
  if (idx === -1) return null;
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(id, body) {
  const idStr = String(id);
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === idStr);
  if (idx === -1) return null;
  contacts[idx] = { id, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
