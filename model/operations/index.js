// import fs from 'fs/promises';
// import path from 'path';
// import { randomUUID } from 'crypto';
// import contacts from '../db/contacts.json';
// import { fileURLToPath } from 'url'

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const contactsPath = path.join(__dirname, 'contacts.json');

// const listContacts = async () => { 
//   return contacts;
// }
  
// const getContactById = async (contactId) => {
//   const contact = contacts.find(contact => contact.id === contactId);
//   return contact;
// }
  
// const removeContact = async (contactId) => {
//   const id = contacts.findIndex(({ id }) => id.toString() === contactId);

//   if (id === -1) {
//     return;
//   }

//   const deletedContact = contacts.splice(id, 1);

//   await fs.writeFile(
//     contactsPath, 
//     JSON.stringify(contacts, null, 2),
//   )
//   return deletedContact;
// }
  
// const addContact = async ({ name, email, phone }) => {
//   const newContact = { id: randomUUID(), name, email, phone };
//   contacts.push(newContact);
//   await fs.writeFile(
//     contactsPath, 
//     JSON.stringify(contacts, null, 2),
//   )
//   return newContact;
// }

// const updateContact = async (contactId, body) => {
//   const id = contacts.findIndex(({ id }) => id.toString() === contactId); 

//   if (id === -1) {
//     return;
//   }

//   const updatedContact = { id: contactId, ...contacts[id], ...body };
//   contacts[id] = updatedContact;

//   await fs.writeFile(
//     contactsPath, 
//     JSON.stringify(contacts, null, 2),
//   )
//   return updatedContact;
// }

import addContact from "./addContact";
import getContactById from "./getContactById";
import listContacts from "./listContacts";
import removeContact from "./removeContact";
import updateContact from "./updateContact";

export default {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContact,
};
