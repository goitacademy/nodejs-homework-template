const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

async function listContacts() {
  return await Contact.find();
}

async function getById(id) {
  return await Contact.findById(id);
}

async function addContact(contact) {
  const newContact = new Contact(contact);
  return await newContact.save();
}

async function removeContact(id) {
  const result = await Contact.findByIdAndDelete(id);
  return result !== null;
}

async function updateContact(id, newData) {
  return await Contact.findByIdAndUpdate(id, newData, { new: true });
}

async function updateStatusContact(id, favorite) {
  return await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
};




