const { Contact } = require("./contact");

module.exports = { Contact };

// const fs = require("fs/promises");
// const path = require("path");
// const shortid = require("shortid");

// const contactsPath = path.join(__dirname, "/contacts.json");

// const listContacts = async () => {
//   const getAll = await fs.readFile(contactsPath);
//   const result = JSON.parse(getAll);
//   return result;
// };

// const getContactById = async (contactId) => {
//   const getAll = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(getAll);
//   const result = contacts.find((contact) => contact.id === contactId);

//   return result;
// };

// const removeContact = async (contactId) => {
//   const getAll = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(getAll);
//   const idx = contacts.findIndex((item) => item.id === contactId);
//   if (idx === -1) {
//     return null;
//   }

//   const updateContacts = contacts.filter((contact) => contact.id !== contactId);
//   await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));

//   return contacts[idx];
// };

// const addContact = async ({ name, email, phone }) => {
//   const newContact = { id: shortid.generate(), name, email, phone };
//   const getAll = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(getAll);
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const getAll = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(getAll);
//   const idx = contacts.findIndex((item) => item.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   contacts[idx] = { id: contactId, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[idx];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
