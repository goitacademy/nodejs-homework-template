// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import contacts from "./contacts.json";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const listContacts = async () => {
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const [contact] = contacts.filter((contact) => contact.id === contactId);
//   return contact;
// };

// const removeContact = async (contactId) => {
//   const getId = contacts.findIndex(
//     (contact) => contactId === contact.id.toString()
//   );
//   if (getId === -1) {
//     return;
//   }

//   const update = contacts.splice(getId, 1);
//   console.log("RemoveContact is done!");

//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),

//     JSON.stringify(contacts, null, 4)
//   );
//   return update;
// };

// const addContact = async ({ name, email, phone }) => {
//   const newContact = { id: randomUUID(), name, email, phone };
//   contacts.push(newContact);
//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),
//     JSON.stringify(contacts, null, 4)
//   );
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const getId = contacts.findIndex(
//     (contact) => contactId === contact.id.toString()
//   );
//   if (getId === -1) {
//     return;
//   }
//   const updatedContact = { id: contactId, ...contacts[getId], ...body };
//   contacts[getId] = updatedContact;
//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),

//     JSON.stringify(contacts, null, 4)
//   );
//   return updatedContact;
// };

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
