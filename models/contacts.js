const fs = require('fs').promises;
const { nanoid } =  import('nanoid');


const contactsFilePath = 'models/contacts.json';

const listContacts = async () => {
  const data = await fs.readFile(contactsFilePath, 'utf-8');
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsFilePath, JSON.stringify(filteredContacts, null, 2));
  return contacts.length !== filteredContacts.length;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) return null;
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
