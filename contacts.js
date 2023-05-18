// const fs = require("fs/promises");

// const path = require("path");

// const contactPath = path.join(__dirname, "/contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactPath);
//   return JSON.parse(data);
// };

// const getContactById = async (contactId) => {
//   const list = await listContacts();

//   const searchContact = list.find((item) => item.id === contactId);
//   return searchContact || null;
// };

// const removeContact = async (contactId) => {
//   const list = await listContacts();
//   const index = list.findIndex((item) => item.id === contactId);
//   if (index === -1) return null;
//   const res = list.splice(index, 1);
//   await fs.writeFile(contactPath, JSON.stringify(list, null, 2));

//   return res;
// };

// const addContact = async (id, name, email, phone) => {
//   const list = await listContacts();
//   const newContact = {
//     id,
//     name,
//     email,
//     phone,
//   };
//   list.push(newContact);
//   await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
//   return newContact;
// };

// const unpdateContact = async (contactId, data) => {
//   const list = await listContacts();
//   const index = list.findIndex((item) => item.id === contactId);
//   if (index === -1) return null;
//   list[index] = {
//     id: contactId,
//     ...data,
//   };

//   await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
//   return list[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   unpdateContact,
// };
