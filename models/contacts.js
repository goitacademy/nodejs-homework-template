// const fs = require('fs').promises;
// const path = require('path');
// const uuid = require('uuid');
// const contactsPath = path.join(__dirname, 'contacts.json');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Set email for contact'],
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

const Contact = model('contact', contactSchema);

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

module.exports = { Contact, schema };

// const listContacts = async () => {
//   const dataString = await fs.readFile(contactsPath, 'utf8');
//   const data = JSON.parse(dataString);
//   return data;
// };

// const getContactById = async contactId => {
//   const allContacts = await listContacts();
//   const contact = allContacts.find(item => item.id === contactId);
//   return contact && contact;
// };

// const removeContact = async contactId => {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex(item => item.id === contactId);
//   const deletedContact = allContacts[index];
//   if (index !== -1) {
//     allContacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//     return deletedContact && deletedContact;
//   }
// };

// const addContact = async body => {
//   const { name, email, phone } = body;
//   const newContact = {
//     id: uuid.v4(),
//     name,
//     email,
//     phone,
//   };
//   const allContacts = await listContacts();
//   allContacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body;
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex(item => item.id === contactId);
//   if (index !== -1) {
//     allContacts[index].name = name;
//     allContacts[index].email = email;
//     allContacts[index].phone = phone;
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//     return allContacts[index];
//   } else return null;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
