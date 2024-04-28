// const fs = require("fs/promises");
// const path = require("path");
// const nanoid = require("nanoid-esm");

// const contactsPath = path.resolve("./models/contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact;
// };

// const addContact = async (contact) => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);

//   if (contact.name && contact.email && contact.phone) {
//     const newContact = { id: nanoid(), ...contact };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } else {
//     return console.error("missing required field(s)");
//   }
// };

// const removeContact = async (contactId) => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);
//   const newContacts = contacts.filter((contact) => contact.id !== contactId);
//   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2)); // NOTE: WTF?
//   return newContacts;
// };

// const updateContact = async (contactId, body) => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);
//   const newContacts = contacts.map(
//     (contact) => (contact.id === contactId ? { ...contact, ...body } : contact) // NOTE: WTF?
//   );
//   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
//   return newContacts;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };