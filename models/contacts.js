// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "./contacts.json");
// // console.log(contactsPath);

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);

//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);

//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   }
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index !== -1) {
//     contacts[index] = {
//       ...contacts[index],
//       ...body,
//     };

//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   }

//   return null;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

// ------------

const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");

const contactsShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactsShema);

module.exports = Contact;
