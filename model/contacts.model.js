const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const CONTACTS_PATH = path.join(__dirname, './contacts.json');

const readFile = async () => {
  const contacts = await fs.readFile(CONTACTS_PATH, 'utf-8');
  return JSON.parse(contacts) || [];
}

const writeFile = async (contacts) => {
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
}

const listContacts = async () => {
  return await readFile();
}

const getContactById = async (contactId) => {
  const contacts = await readFile();
  return contacts.find(contact => String(contact.id) === contactId);
}

const removeContact = async (contactId) => {
  const contacts = await readFile();
  const contactIdx = contacts.findIndex(contact => String(contact.id) === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const result = contacts.splice(contactIdx, 1);
  await writeFile(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await readFile();
  const contact = {id: uuid.v4(), ...body};
  contacts.push(contact);
  await writeFile(contacts);
  return contact;
}

const updateContact = async (contactId, body) => {
  const contacts = await readFile();
  const contactIdx = contacts.findIndex(contact => String(contact.id) === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = {...contacts[contactIdx], ...body};
  await writeFile(contacts);
  return contacts[contactIdx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
