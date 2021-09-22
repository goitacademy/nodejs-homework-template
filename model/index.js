// const fs = require("fs/promises");
// // const contacts = require("./contacts.json");
// const { nanoid } = require("nanoid");
// const path = require("path");

// const filePath = path.join(__dirname, "contacts.json");

// // const getAllContacts = async () => {
// //   const data = await fs.readFile(filePath, "utf-8");
// //   const contacts = JSON.parse(data);
// //   return contacts;
// // };
// // const listContacts = async () => {
// //   const contacts = await getAllContacts();
// //   return contacts;
// // };

// const listContacts = async () => {
//   const data = await fs.readFile(filePath, "utf8");
//   return JSON.parse(data);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === Number(contactId));
//   if (!contact) {
//     return null;
//   }
//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();

//   if (!contact) return;
//   console.log("Removing a contact...");

//   const newContacts = contacts.filter(
//     (contact) => contact.id !== Number(contactId)
//   );

//   await fs.writeFile(filePath, JSON.stringify(newContacts));
//   console.log("Success remove");
//   return "Success remove";
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = { ...body, id: nanoid() };
//   contacts.push(newContact);

//   await fs.writeFile(filePath, JSON.stringify(contacts));

//   return newContact;
// };

// const updateContactsById = async (id, body) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((contact) => contact.id === Number(id));
//   if (idx === -1) {
//     return null;
//   }
//   const updateContact = { ...contacts[idx], ...body };
//   contacts[idx] = updateContact;

//   await fs.writeFile(filePath, JSON.stringify(contacts));
//   return updateContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContactsById,
// };
