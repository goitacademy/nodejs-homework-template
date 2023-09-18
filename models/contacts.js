
// const { nanoid } = require("nanoid");
// const path = require("node:path");

// const fs = require("node:fs/promises");

// const DB_PATH = path.join(__dirname, "./contacts.json");
// console.log(DB_PATH);

// const listContacts = async () => {
//     const data = await fs.readFile(DB_PATH, "utf-8");

//     return JSON.parse(data);
  
// }

// const getContactById = async (contactId) => {
//   String(contactId);
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact;
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   String(contactId);
     
//   const IndexContact = contacts.findIndex(
//     (contact) => contact.id === contactId
//   );

//   contacts.slice(IndexContact, 1);
//   await fs.writeFile(DB_PATH, JSON.stringify(contacts, null, 2));
//   return contacts[IndexContact];
  
// }

// const addContact = async (name, email, phone) => {

//       const contacts = await listContacts();
//       const newContact = {
//         id: nanoid(),
//         name,
//         email,
//         phone,
//   };
  
//       contacts.push(newContact);
//       await fs.writeFile(DB_PATH, JSON.stringify(contacts, null, 2));
//       return newContact;
// };

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
