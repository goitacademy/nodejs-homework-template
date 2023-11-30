// const mongoose = require('mongoose');


// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Set name for contact'],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });


// const Contact = mongoose.model('Contact', contactSchema);


// const listContacts = async () => {
//   return Contact.find({});
// };


// const getContactById = async (contactId) => {
//   return Contact.findById(contactId);
// };

// const removeContact = async (contactId) => {
//   return Contact.findByIdAndRemove(contactId);
// };


// const addContact = async (body) => {
//   return Contact.create(body);
// };


// const updateContact = async (contactId, body) => {
//   return Contact.findByIdAndUpdate(contactId, { $set: body }, { new: true });
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };


const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../utils');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please set name for contact'],
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
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', handleSaveErrors);

const Contact = model('contact', contactSchema);

module.exports = { Contact };