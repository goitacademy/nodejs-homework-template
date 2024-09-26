// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const writeContact = async (contacts) => {
//   try {
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   } catch (error) {
//     throw new Error(`Error writing contacts: ${error.message}`);
//   }
// };

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     throw new Error(`Error reading contacts: ${error.message}`);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const result = contacts.find((contact) => contact.id === contactId);
//     return result || null;
//   } catch (error) {
//     throw new Error(`Error getting contact by ID: ${error.message}`);
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
//     await writeContact(contacts);
//     return result;
//   } catch (error) {
//     throw new Error(`Error removing contact: ${error.message}`);
//   }
// };

// const addContact = async (body) => {
//   try {
//     const contacts = await listContacts();
//     const newContact = {
//       id: nanoid(),
//       ...body,
//     };
//     contacts.push(newContact);
//     await writeContact(contacts);
//     return newContact;
//   } catch (error) {
//     throw new Error(`Error adding contact: ${error.message}`);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { contactId, ...body };
//     await writeContact(contacts);
//     return contacts[index];
//   } catch (error) {
//     throw new Error(`Error updating contact: ${error.message}`);
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
