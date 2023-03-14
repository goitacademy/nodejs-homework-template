const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [removeContact] = contacts.splice(index, 1);
  await update(contacts);
  return removeContact;
};

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {id: String(contacts.length + 1), name, email, phone};
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  contacts[index] = {id: contactId, name, email, phone};
  await update(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
