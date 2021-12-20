// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }


import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import contacts from './contacts.json'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, 'contacts.json');

// const readContacts = async () => {
//     const content = await fs.readFile(contactsPath,'utf8',)
//     const result = JSON.parse(content);
//     return result;
// }

const listContacts = async () => {
  return contacts;
}

const getById = async (contactId) => {
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
}

const removeContact = async (contactId) => {
  const removeIndex = contacts.findIndex((contact) => contact.id === contactId);
  const contactForRemove = contacts[removeIndex];
  if (removeIndex !== -1) {
    const newContacts = contacts.filter((contact) => contact.id != contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2)
    );
    return contactForRemove;
  }
  return null;
}

const addContact = async ({ name, email, phone }) => {
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
}

const updateContact = async (contactId, body) => {
  const updateIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (updateIndex !== -1) {
    const updatedContact = { id: contactId, ...contacts[updateIndex], ...body };
    contacts[updateIndex] = updatedContact;
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return updatedContact;
  }
  return null;
}

export default {
  updateContact,
  listContacts,
  getById,
  removeContact,
  addContact
}
