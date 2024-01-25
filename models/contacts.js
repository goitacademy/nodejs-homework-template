<<<<<<< Updated upstream
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
=======
import mongoose from 'mongoose';
>>>>>>> Stashed changes

const contactSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});


contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async (filter, options) => {

  return Contact.paginate(filter, options);
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};