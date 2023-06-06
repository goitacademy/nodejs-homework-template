// const fs = require("fs/promises");
// const path = require("path");

// const { nanoid } = require("nanoid");

// const dbPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const allContacts = await fs.readFile(dbPath);

//   return JSON.parse(allContacts);
// };

// const getContactById = async (contactId) => {
//   const allContacts = await listContacts();
//   const contactById = allContacts.find((el) => el.id === contactId);
//   return contactById;
// };

// const removeContact = async (contactId) => {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex((el) => el.id === contactId);
//   if (index === -1) return null;
//   const [results] = allContacts.splice(index, 1);
//   fs.writeFile(dbPath, JSON.stringify(allContacts, null, 2));
//   console.log("deleted contact", results);
//   return results;
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const allContacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   const updatedContacts = [...allContacts, newContact];
//   fs.writeFile(dbPath, JSON.stringify(updatedContacts, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex((el) => el.id === contactId);
//   if (index === -1) return null;
//   const contactByIndex = allContacts[index];
//   const contactToUpdate = {
//     ...contactByIndex,
//     ...body,
//   };

//   allContacts.splice(index, 1, contactToUpdate);

//   fs.writeFile(dbPath, JSON.stringify(allContacts, null, 2));
//   return contactToUpdate;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
