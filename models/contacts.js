// const fs = require("fs/promises");
// const path = require("path");
// const { v4 } = require("uuid");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const allContacts = await listContacts();
//   const result = allContacts.find((item) => item.id === contactId);
//   if (!result) {
//     return null;
//   }
//   return result;
// };

// const removeContact = async (contactId) => {
//   const allContacts = await listContacts();
//   const idx = allContacts.findIndex((item) => item.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const [removeContact] = allContacts.splice(idx, 1);

//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return removeContact;
// };

// const addContact = async (name, email, phone) => {
//   const allContacts = await listContacts();
//   const newContact = {
//     id: v4(),
//     name,
//     email,
//     phone,
//   };
//   allContacts.push(newContact);

//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return newContact;
// };

// const updateContact = async (contactId, name, email, phone) => {
//   const allContacts = await listContacts();
//   const contactIndex = allContacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex !== -1) {
//     allContacts[contactIndex].name = name;
//     allContacts[contactIndex].email = email;
//     allContacts[contactIndex].phone = phone;
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//     return allContacts[contactIndex];
//   } else {
//     return null;
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
