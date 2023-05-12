const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  const contacts = buffer.toString();
  return JSON.parse(contacts);
}

const getContactById = async (contacts, contactId) => {
  const contact = await contacts.find(contact => contact.id === contactId) || null;
  return contact;
}

const removeContact = async (contacts, contactId) => {
  const newContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
}

const addContact = async (contacts, body) => {
  contacts.push({...body});
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const updateContact = async (contacts, contactId, body) => {
  const contact = await contacts.find(contact => contact.id === contactId) || null;
  if (!contact) return contact;
  const updatedContact = { ...contact, ...body };
  const contactIndex = contacts.indexOf(contact);
  contacts.splice(contactIndex, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
