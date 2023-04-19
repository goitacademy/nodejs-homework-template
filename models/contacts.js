const { Schema, model } = require("mongoose");
const contactShema = Schema({
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
});

const Contact = model("contact", contactShema);
module.exports = Contact;












// const fs = require('fs/promises')
// const uuid = require('uuid');
// const path = require('path');
// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const dataString = await fs.readFile(contactsPath);
//   const data = JSON.parse(dataString);
//   return data;
// }

// const getContactById = async (id) => {
//   const allContacts = await listContacts();
//   const index = allContacts.find(contact => contact.id === id);
//   return index || null;
// }

// const removeContact = async (contactId) => {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex(contact => contact.id === contactId);
//   const DeletedContact = allContacts[index];
//   if (index === -1) {
//     allContacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   }
//   return DeletedContact || null;
// }

// const addContact = async(name, email, phone) => {
//   const newContact = {
//     id: uuid.v4(),
//     email: email,
//     name: name,
//     phone: phone,
//   };
//   const allContacts = await listContacts();
//   allContacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
// }

// const updateContact = async (contactId, body) => {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex(contact => contact.contactId === contactId);
//   if (index === -1) return null;
//   allContacts[index] = { contactId, ...body };
//   await updateContact(allContacts);
//   return allContacts[index];
// }


// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
