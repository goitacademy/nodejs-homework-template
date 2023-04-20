const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
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

const Contacts = mongoose.model('contact', contact);

const listContacts = () => Contacts.find();

const getContactById = id => Contacts.findById(id);

const removeContact = id => Contacts.findByIdAndDelete(id);

const addContact = body => Contacts.create(body);

const updateContact = (contactId, body) =>
  Contacts.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = (contactId, body) =>
  Contacts.findByIdAndUpdate(contactId, body, { new: true });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
