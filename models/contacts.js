// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.resolve(__dirname, "contacts.json");

// const saveContacts = async (data) => {
//   await fs.writeFile(contactsPath, JSON.stringify(data));
// };

// const listContacts = async () => {
//   const contactsData = await fs.readFile(contactsPath);
//   const contactsJsoned = JSON.parse(contactsData);
//   return contactsJsoned;
// };

// const getContactById = async (id) => {
//   const contacts = await listContacts();
//   return contacts.find((el) => el.id === id);
// };

// const removeContact = async (id) => {
//   try {
//     const contacts = await listContacts();
//     const newContacts = contacts.filter((contact) => contact.id !== id);

//     if (contacts.length > newContacts.length) {
//       await saveContacts(newContacts);
//       return listContacts();
//     }
//   } catch (error) {
//     console.log("Something gone wrong: ", error);
//     return error;
//   }
// };

// const addContact = async (body) => {
//   try {
//     const { name, email, phone } = body;
//     const newContact = { id: nanoid(), name, email, phone };
//     const contacts = await listContacts();
//     const newContacts = [...contacts, newContact];
//     await saveContacts(newContacts);
//     return newContact;
//   } catch (error) {
//     console.log("Something hone wrong: ", error);
//     return error;
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const indexToUpdate = contacts.findIndex(
//       (contact) => contact.id === contactId
//     );
//     if (indexToUpdate !== -1) {
//       contacts[indexToUpdate] = { id: contactId, ...body };
//       await saveContacts(contacts);
//       return contacts[indexToUpdate];
//     }
//     return false;
//   } catch (error) {
//     console.log("Something hone wrong: ", error);
//     return error;
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
