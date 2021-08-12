const { Contact } = require('../models');

const listContacts = (filter, options) => {
  const result = Contact.paginate(filter, options, function (_, result) {
    return {
      result: result.docs,
      total: result.totalDocs,
    };
  });
  return result;
};

const getContactById = async contactId => {
  try {
    const result = await Contact.findById(contactId);
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

const updateContactById = async (contactId, updatedContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
    return result;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    }
    throw error;
  }
};

const deleteContactById = async contactId => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    }
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};