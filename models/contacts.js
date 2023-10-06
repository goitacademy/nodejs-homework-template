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
  
  if (contacts.length === updatedContacts.length) {
    // Контакт з вказаним ID не було знайдено, можна відповісти зі статусом 404
    throw new Error('Contact not found');
  }

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  // Повідомлення про успішне видалення
  return { message: 'Contact deleted' };
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
  const updatedContactIndex = contacts.findIndex((c) => c.id === contactId);
  if (updatedContactIndex === -1) {
    throw new Error('Contact not found');
  }
  const updatedContact = { ...contacts[updatedContactIndex], name, email, phone };
  contacts[updatedContactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
