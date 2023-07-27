const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
 const contacts = await fs.readFile(contactsPath);
 return JSON.parse(contacts);
};

const getContactById = async contactId => {
 const contacts = await listContacts();
 const contact = contacts.find(contact => contact.id === contactId) || null;
 return contact;
};

const removeContact = async contactId => {
 const contacts = await listContacts();
 const removedContact = contacts.find(contact => contact.id === contactId);
 if (!removedContact) {
  console.log('not found contact');
  return null;
 }
 const updatedContacts = contacts.filter(contact => contact.id !== contactId);
 await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
 return true;
};

const addContact = async ({ name, email, phone }) => {
 const contacts = await listContacts();
 const newContact = {
  id: nanoid(),
  name,
  email,
  phone,
 };
 contacts.push(newContact);
 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
 return newContact;
};

const updateContact = async (id, data) => {
 const contacts = await listContacts();
 const index = contacts.findIndex(contact => contact.id === id);
 if (index === -1) return null;
 contacts[index] = { id, ...data };
 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
 return contacts[index];
};

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
};
