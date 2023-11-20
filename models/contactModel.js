import mongoose from 'mongoose';

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
    console.error('Error reading contacts from database:', error.message);
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error reading contact from database:', error.message);
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    console.error('Error removing contact from database:', error.message);
    throw error;
  }
};

const addContact = async body => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.error('Error adding contact to database:', error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error('Error updating contact in database:', error.message);
    throw error;
  }
};

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: favorite },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    throw error;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  Contact,
};
