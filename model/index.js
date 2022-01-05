import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const contacts = require("./contacts.json")

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact
}

const removeContact = async (contactId) => {
  const DeletedContact = contacts.findIndex(option => option.id === contactId);
  if (DeletedContact >=0 ) {
    const deletedContact = contacts.splice(DeletedContact, 1)
    await fs.writeFile(
      path.join( __dirname, 'contacts.json'), 
      JSON.stringify(contacts, null, 2));
    return deletedContact
  }
  return null
}

const addContact = async({name, email, phone}) => {   
  const newContact = {id:randomUUID(), name, email, phone};
  contacts.push(newContact);
  await fs.writeFile(
      path.join( __dirname, 'contacts.json'), 
      JSON.stringify(contacts, null, 2));
   return newContact
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((option) => option.id === contactId);
   if (index >=0 ) {
      const updatedContact = {id: contactId, ...contacts[index],  ...body}
      contacts[index] = updatedContact
      await fs.writeFile(
        path.join( __dirname, 'contacts.json'), 
        JSON.stringify(contacts, null, 2));
      return contacts[index]
  }
  return null
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
