const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

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
});

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error('Error reading contacts:', error);
    throw new Error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw new Error(error.message);
  }
};

const addContact = async (contact) => {
  try {
    const newContact = await Contact.create(contact);
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw new Error(error.message);
  }
};

const updateContact = async (contactId, updatedData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    return removedContact._id;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  Contact,
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
