// const fs = require("fs/promises");

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "/db/contacts.json");

// const getAll = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// async function listContacts() {
//   try {
//     const contacts = await getAll();
//     return contacts;
//   } catch (error) {
//     console.error("Get List method is incomplete", error);
//     throw error;
//   }
// }

// async function getContactById(contactId) {
//   try {
//     const contacts = await getAll();
//     const result = contacts.find((item) => item.id === contactId);
//     return result || null;
//   } catch (error) {
//     console.error("Error in getContactById:", error);
//     throw error;
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const contacts = await getAll();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index >= 0) {
//       const [deletedContact] = contacts.splice(index, 1);
//       await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//       return deletedContact;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error in removeContact:", error);
//     throw error;
//   }
// }

// async function addContact(name, email, phone) {
//   try {
//     const contacts = await getAll();
//     const newContact = {
//       id: nanoid(),
//       name,
//       email,
//       phone,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.error("Error in addContact:", error);
//     throw error;
//   }
// }

// module.exports = {
//   getContactById,
//   listContacts,
//   addContact,
//   removeContact,
// };
