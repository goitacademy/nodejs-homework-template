const { Contact } = require('../model');

const listContact = () => {
  return Contact.find();
};

const getContactById = async id => {
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

const removeContact = async id => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    }
    throw error;
  }
};

const addContact = newContact => {
  return Contact.create(newContact);
};

const updateContact = async (id, updateContacts) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, updateContacts, {
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

const updateStatusContact = async (id, updateStatusContacts) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, updateStatusContacts, {
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

module.exports = {
  listContact,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact
};
