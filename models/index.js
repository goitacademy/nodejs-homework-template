// import fs from 'fs/promises';
// import path from 'path';
// import { randomUUID } from 'crypto';
// import contacts from './contacts.json';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const contactsPath = path.join(__dirname, 'contacts.json');
// console.log(contactsPath);

// // const listContacts = async () => {
// //     return contacts;
// // };

// // const getContactById = async (contactId) => {
// //     const [contact] = contacts.filter((contact) => contact.id === contactId);
// //     return contact;
// // }

// // const removeContact = async (contactId) => {
// //     const [contact] = contacts.filter((contact) => contact.id === contactId);
// //     contacts.splice(contacts.indexOf(contact), 1);
// //     await fs.writeFile(
// //     contactsPath,
// //     JSON.stringify(contacts, null, 2),
// //     )

// //     return contact;
// // }

// const addContact = async ({name, email, phone}) => {
//   const newContact = { id: randomUUID(), name, email, phone }
//   contacts.push(newContact)
//   await fs.writeFile(
//     contactsPath,
//     JSON.stringify(contacts, null, 2),
//   )
//   return newContact
// }

// const updateContact = async (contactId, body) => {
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index !== -1) {
//     const updatedContact = { id: contactId, ...contacts[index], ...body };
//     contacts[index] = updatedContact
//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(contacts, null, 2),
//     );

//     return updatedContact;
//   };

//   return null;
// }

// export default { listContacts, getContactById, removeContact, addContact, updateContact };