const Contact = require('./schemas/contacts');

const listContacts = async () => {
  try {
    const response = await Contact.find();
    console.log(response)
    return response
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    const response = await Contact.findOne({ _id: contactId });
    return response
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const response = await Contact.findByIdAndRemove({ _id: contactId });
    return response
  } catch (err) {
    throw err;
  }
};

const addContact = async ({ body }) => {
  try {
    const { name, email, phone } = body;
    const response = await Contact.create({ name, email, phone });
    return response
  } catch (err) {
    throw err;
  }
};

const updateContact = async (contactId, { updatedData }) => {
  try {
    const response = await Contact.findByIdAndUpdate({ _id: contactId }, updatedData, { new: true });
    return response
  } catch (err) {
    throw err;
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    const response = await Contact.findByIdAndUpdate({ _id: contactId }, favorite, { new: true });
    return response
  } catch (err) {
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}