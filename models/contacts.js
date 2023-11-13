const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Contact", contactSchema);

// // List all contacts
// const listContacts = async () => {
//   return await Contact.find();
// };

// // Get a single contact by ID
// const getContactById = async (contactId) => {
//   return await Contact.findById(contactId);
// };

// // Add a new contact
// const addContact = async (body) => {
//   const newContact = new Contact(body);
//   return await newContact.save();
// };

// // Update a contact
// const updateContact = async (contactId, body) => {
//   return await Contact.findByIdAndUpdate(contactId, body, { new: true });
// };

// // Remove a contact
// const removeContact = async (contactId) => {
//   return await Contact.findByIdAndRemove(contactId);
// };
