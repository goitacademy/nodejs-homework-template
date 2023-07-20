// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading contacts file:", error);
//     throw error;
//   }
// }

// async function getContactById(contactId) {
//   try {
//     const stringContactId = String(contactId);
//     const contacts = await listContacts();
//     const result = contacts.find((contact) => contact.id === stringContactId);
//     return result || null;
//   } catch (error) {
//     console.error("Error getting contact by ID:", error);
//     throw error;
//   }
// }

// async function addContact(data) {
//   try {
//     const contacts = await listContacts();
//     const newContact = {
//       id: nanoid(),
//       ...data,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.error("Error adding contact:", error);
//     throw error;
//   }
// }

// async function updateContact(contactId, data) {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { contactId, ...data };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   } catch (error) {
//     console.error("Error update contact:", error);
//     throw error;
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const stringContactId = String(contactId);
//     const contacts = await listContacts();
//     const index = contacts.findIndex(
//       (contact) => contact.id === stringContactId
//     );
//     if (index === -1) {
//       return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   } catch (error) {
//     console.error("Error removing contact:", error);
//     throw error;
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContact,
//   removeContact,
// };
