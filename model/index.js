const fs = require("fs/promises");
const path = require("path");
// const contacts = require("./contacts.json");
const contactsPath = path.resolve("./model/contacts.json");

const listContacts = require("./listContacts.js");
const getContactById = require("./getContactById.js");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf8");
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const contactById = contacts.find(
//       (item) => item.id.toString() === contactId.toString()
//     );
//     return contactById;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
