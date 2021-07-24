const { Contact } = require('./contact');

const getAllContact = async () => {
  return Contact.find();
};

const getContactsById = async (id) => {
  try {
    const result = await Contact.findById(id);
    return result;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    }
    throw error;
  }
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = async (id, favorite) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, favorite, {
      new: true,
    });
    return result;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    }
    throw error;
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id)
    return result
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null
    }
    throw error
  }
};

module.exports = {
  getAllContact,
  getContactsById,
  createContact,
  updateContact,
  removeContact,
};
