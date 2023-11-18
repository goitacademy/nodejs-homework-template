import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts.toString());
};

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   return contacts.find(({ id }) => id === contactId) || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex(({ id }) => id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const removedId = contacts[index];
//   contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return removedId;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), ...body };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex(({ id }) => id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const updatedId = contacts[index];
//   const updatedContact = {...updatedId, ...body };

//   contacts[index] = updatedContact;
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return updatedContact;
// };

export default {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
