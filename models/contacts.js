// const fs = require("fs/promises");
// const path = require("path");
// const contactsPath = path.join(__dirname, "contacts.json");
// // const mongoose = require('mongoose');
// const Contact = require('../service/schemas/contacts')



// const listContacts = async () => {
//   const contactsList = await Contact.find()
//   console.log(contactsList)
    
//   return contactsList;
// };

// const getContactById = async (contactId) => {
//   const contact = await fs
//     .readFile(contactsPath)
//     .then((data) => {
//       return JSON.parse(data.toString()).find(
//         (contact) => contact.id === contactId,
//       );
//     })
//     .then((result) => {
//       if (result) {
//         return { data: result, status: "success", code: 200 };
//       } else {
//         return { message: "Not found", status: "error", code: 404 };
//       }
//     })
//     .catch((error) => console.log(error.message));
//   return contact;
// };

// const removeContact = async (contactId) => {
//   let length = 0;
//   const message = await fs
//     .readFile(contactsPath)
//     .then(async (data) => {
//       length = JSON.parse(data).length;
//       return JSON.parse(data);
//     })
//     .then((contacts) =>
//       fs
//         .writeFile(
//           contactsPath,
//           JSON.stringify(
//             contacts.filter((contact) => contact.id !== contactId),
//           ),
//         )
//         .catch((error) => console.log(error.message)),
//     )
//     .then(async () => {
//       return await fs
//         .readFile(contactsPath)
//         .then(async (data) => {
//           return JSON.parse(data).length === length
//             ? { message: "Not found", status: "error", code: 404 }
//             : { message: "contact deleted", status: "success", code: 200 };
//         })
//         .catch((error) => console.log(error.message));
//     })
//     .catch((error) => console.log(error.message));
//   return message;
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body.value;
//   if (name || email || phone) {
//     return {
//       message: "missing required name field",
//       status: "error",
//       code: 404,
//     };
//   }
//   const contact = new Contact({
//     name: name,
//     email: email,
//     phone: phone,
//   });
//   contact.save()
//   return {
//     data: contact,
//     status: "success",
//     code: 201,
//   };
// };

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body;
//   if (name && email && phone) {
//     return { message: "missing fields", status: "error", code: 404 };
//   }
//   let chosenIndex = 0;
//   let filteredContact = {};
//   let updatedContact = {};
//   await fs
//     .readFile(contactsPath)
//     .then((data) => {
//       return JSON.parse(data);
//     })
//     .then((contacts) => {
//       chosenIndex = contacts.indexOf(
//         contacts.find((contact) => contact.id === contactId),
//       );
//       filteredContact = contacts.find((contact) => contact.id === contactId);
//       updatedContact = { ...filteredContact, ...body };
//       contacts.splice(chosenIndex, 1, updatedContact);
//       if (chosenIndex !== -1) {
//         fs.writeFile(contactsPath, JSON.stringify(contacts)).catch((error) =>
//           console.log(error.message),
//         );
//       }
//     })
//     .catch((error) => console.log(error.message));
//   if (chosenIndex === -1) {
//     return { message: "Not found", status: "error", code: 404 };
//   } else {
//     return { data: updatedContact, status: "success", code: 200 };
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };