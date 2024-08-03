const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async (owner) => {
  return await Contact.find({ owner });
};

const getContactById = async (id, owner) => {
  return await Contact.findOne({ _id: id, owner });
};

const removeContact = async (id, owner) => {
  return await Contact.findOneAndDelete({ _id: id, owner });
};

const addContact = async ({ name, email, phone, favorite = false, owner }) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  return await contact.save();
};

const updateContact = async (id, owner, updateFields) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, updateFields, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};