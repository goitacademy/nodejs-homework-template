// import { promises as fs } from 'fs';
// import { join } from "path";
// import { nanoid } from "nanoid";

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const contactsPath = join(__dirname, "contacts.json");

// export const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// export const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find(contact => contact.id === contactId);
//   return result || null;
// };

// export const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(contact => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
// };

// export const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body
//   }
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// export const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(contact => contact.id === contactId);
//   if(index === -1){
//     return null;
//   }
//   contacts[index] = {contactId, ...body};
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };