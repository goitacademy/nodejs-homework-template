// const { readFile, writeFile } = require("fs/promises");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// const contactsDb = path.resolve(__dirname, "contacts.json");

// async function listContacts() {
//   try {
//     const contact = await readFile(contactsDb, "utf-8");
//     return JSON.parse(contact);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   return await contacts.find((c) => c.id === contactId);
// }

// async function addContact(body) {
//   const contacts = await listContacts();
//   const newContact = { ...body, id: uuidv4() };
//   const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
//   try {
//     await writeFile(contactsDb, contactsList, "utf-8");
//   } catch (error) {
//     console.log(error);
//   }
//   return newContact;
// }

// async function updateContact(contactId, body) {
//   const contacts = await listContacts();
//   const i = contacts.findIndex((c) => c.id === contactId);
//   if (i === -1) return null;
//   contacts[i] = { ...contacts[i], ...body };
//   try {
//     await writeFile(contactsDb, JSON.stringify(contacts, null, "\t"), "utf-8");
//   } catch (error) {
//     console.log(error);
//   }
//   return contacts[i];
// }

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const deleteContact = contacts.filter((c) => c.id !== contactId);

//   try {
//     if (contacts.length !== deleteContact.length) {
//       await writeFile(
//         contactsDb,
//         JSON.stringify(deleteContact, null, "\t"),
//         "utf-8"
//       );
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
