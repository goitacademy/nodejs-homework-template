const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find(contact => contact.id === contactId) || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find(contact => contact.id === contactId);

  if (deletedContact) {
    filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
    return deletedContact;
  }
  else return null;
}

const addContact = async (body) => {
  const newContact = { id: nanoid(21), ...body };
  const contacts = await listContacts();

  if (!contacts.find(contact => contact.name === body.name)) {
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return newContact;
  }
  else return null;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const updatedContact = { id: contactId, ...body };
  
  if (index === -1) {
    return null;
  }
  
  const updatedContacts = [
    ...contacts.slice(0, index),
    updatedContact,
    ...contacts.slice(index + 1), 
  ];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
