// const fs = require("fs/promises");


// const path = require("path");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const dataString = await fs.readFile(contactsPath, "utf-8");
//   const data = JSON.parse(dataString);
//   return data;
// };

// const getContactById = async (contactId) => {
//   const allContacts = await listContacts(contactsPath);
//   const contact = allContacts.find((contact) => contact.id === contactId);
//   if (contact === -1) {
//     return null;
//   } else {
//     return contact;
//   }
// };

// const removeContact = async (contactId) => {
//   const allContacts = await listContacts(contactsPath);
//   const contactIndex = allContacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex === -1) {
//     return null;
//   } else {
//     allContacts.splice(contactIndex, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//     return allContacts;
//   }
// };

// const addContact = async (body) => {
//   const allContacts = await listContacts(contactsPath);
//   allContacts.push(body);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return body;
// };

// const updateContact = async (contactId, body) => {
//   const allContacts = await listContacts(contactsPath);
//   const contactIndex = allContacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex !== -1) {
//     allContacts[contactIndex].name = body.name;
//     allContacts[contactIndex].email = body.email;
//     allContacts[contactIndex].phone = body.phone;
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//     return allContacts[contactIndex];
//   } else {
//     return null;
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
  })

model('', schema);

const Contacts = model('contact', schema);

module.exports = Contacts;