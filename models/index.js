// const fs = require("fs/promises");
// const path = require("path");
// const { v4 } = require("uuid");
// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   try {
//     const result = await fs.readFile(contactsPath);
//     const data = JSON.parse(result);
//     return data;
//   } catch (error) {
//     console.error("Failed to list contacts:", error);
//     throw error;
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const result = contacts.find((contact) => contact.id === contactId);
//     return result;
//   } catch (error) {
//     console.error(`Failed to get contact with ID ${contactId}:`, error);
//     throw error;
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   } catch (error) {
//     console.error(`Failed to remove contact with ID ${contactId}:`, error);
//     throw error;
//   }
// };

// const addContact = async (body) => {
//   try {
//     const contacts = await listContacts();
//     const newContact = { id: v4(), ...body };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.error("Failed to add contact:", error);
//     throw error;
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { ...contacts[index], ...body };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   } catch (error) {
//     console.error(`Failed to update contact with ID ${contactId}:`, error);
//     throw error;
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
