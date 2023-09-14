const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

// Getting contact list
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');

  return JSON.parse(data);
};

// Getting contact by ID
const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

// Remove contact by ID
const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
};

// Adding a new contact to the contact list
const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

// Update contact by ID
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;    
  }
  
  else {
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
