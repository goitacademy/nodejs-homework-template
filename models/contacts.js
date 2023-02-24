// const fs = require("fs/promises");
// const short = require("short-uuid");
// const { loadavg } = require("os");
// const path = require("path");
// const contactsPath = path.resolve("./models/contacts.json");

// // npx nodemon --inspect ./server.js

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const contactsArr = JSON.parse(contacts);
//     const contactGet = contactsArr.find((contact) => contact.id === contactId);
//     return contactGet;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const contactsArr = JSON.parse(contacts);
//     const contactFromId = contactsArr.find(
//       (contact) => contact.id === contactId
//     );
//     if (!contactFromId) {
//       return null;
//     } else {
//       const contactDelete = contactsArr.filter(
//         (contact) => contact.id !== contactId
//       );
//       await fs.writeFile(contactsPath, JSON.stringify(contactDelete), "utf8");
//       return contactFromId;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const contactNew = {
//     id: short.generate("0123456789"),
//     name: name,
//     email: email,
//     phone: phone,
//   };
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const contactsArr = JSON.parse(contacts);
//     if (!name || !email || !phone) {
//       return contactsArr;
//     } else {
//       const newContactsArr = [...contactsArr, contactNew];
//       await fs.writeFile(contactsPath, JSON.stringify(newContactsArr), "utf8");
//       return newContactsArr;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body;
//   if (!name & !email & !phone) {
//     return;
//   }
  
//     try {
//       const contacts = await fs.readFile(contactsPath, "utf8");
//       const contactsArr = JSON.parse(contacts);
//       const [contactChenge] = contactsArr.filter(
//         (contact) => contact.id === contactId
//       );
//       if (name) { contactChenge.name = name };
//       if (email) { contactChenge.email = email};
//       if (phone) {contactChenge.phone = phone};

//       await fs.writeFile(contactsPath, JSON.stringify(contactsArr), "utf8");
//       return contactsArr;
//     } catch (error) {
//       console.log(error);
//     }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
