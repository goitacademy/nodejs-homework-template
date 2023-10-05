// contacts.js (модуль з функціями для роботи з контактами)
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json'); // Шлях до файлу з контактами

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.map((c) =>
    c.id === contactId ? { ...c, name, email, phone } : c
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  const updatedContact = updatedContacts.find((c) => c.id === contactId);
  if (!updatedContact) {
    throw new Error('Contact not found');
  }
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
