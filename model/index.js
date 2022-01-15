const contact = require("./contact");

module.exports = contact;

// const fs = require("fs/promises");
// const path = require("path");
// const { v4 } = require("uuid");

// const filePath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const contacts = JSON.parse(await fs.readFile(filePath));
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.filter((contact) => contact.id === contactId);
//   if (!contact.length) return null;
//   return contact;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = { id: v4(), ...body };
//   contacts.push(newContact);
//   await fs.writeFile(filePath, JSON.stringify(contacts));
//   return newContact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const updateContact = contacts.filter((contact) => contact.id !== contactId);
//   console.log(updateContact);
//   if (updateContact.length === contacts.length) return null;
//   await fs.writeFile(filePath, JSON.stringify(updateContact));
//   return updateContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((contact) => contact.id === contactId);
//   if (idx === -1) return null;
//   contacts[idx] = { ...contacts[idx], ...body };
//   await fs.writeFile(filePath, JSON.stringify(contacts));
//   return contacts[idx];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
