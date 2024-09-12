const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const Contact = model('contact', contactSchema);

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contact({ name, email, phone });
  return await newContact.save();
};

const removeContact = async contactId => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw error;
  }
};

const updateContact = async (contactId, updates) => {
  return await Contact.findByIdAndUpdate(contactId, updates, { new: true });
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
