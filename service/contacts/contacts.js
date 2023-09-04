const Contact = require('../../schemas/contacts');

const listContacts = async ({ page = 1, limit = 20, favorite }, userId) => {
  const query = favorite ? { favorite, owner: userId } : { owner: userId };
  const response = await Contact.find(query).skip((page - 1) * limit).limit(limit).lean();
  return response
};

const getContactById = async (contactId, userId) => {
  const response = await Contact.findOne({ _id: contactId, owner: userId });
  return response
};

const removeContact = async (contactId, userId) => {
  const response = await Contact.findByIdAndRemove({ _id: contactId, owner: userId });
  return response
};

const addContact = async (data) => {
  const response = await Contact.create(data);
  return response
};

const updateContact = async (contactId, userId, { updatedData }) => {
  const response = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, updatedData, { new: true });
  return response
};

const updateStatusContact = async (contactId, userId, favorite) => {
  const response = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, favorite, { new: true });
  return response
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};