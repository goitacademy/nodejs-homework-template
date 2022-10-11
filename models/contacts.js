// const path = require("path");
// const fs = require("fs/promises");

// const contatsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const contacts = await fs.readFile(contatsPath);
//   return JSON.parse(contacts);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((el) => el.id === contactId);

//   if (!contact) {
//     throw new Error("Not found");
//   }

//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     throw new Error("Not found");
//   }

//   contacts.splice(index, 1);
//   await fs.writeFile(contatsPath, JSON.stringify(contacts, null, 2));
// };

// const addContact = async (body) => {
//   try {
//     const contacts = await listContacts();

//     contacts.push(body);
//     await fs.writeFile(contatsPath, JSON.stringify(contacts, null, 2));

//     return body;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(({ id }) => id === contactId);

//   if (index === -1) {
//     throw new Error("Not found");
//   }

//   const updateContact = { ...contacts[index], ...body };
//   contacts[index] = updateContact;

//   await fs.writeFile(contatsPath, JSON.stringify(contacts, null, 2));

//   return updateContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
