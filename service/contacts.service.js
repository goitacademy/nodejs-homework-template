const Contacts = require('./schemas/contacts');

const getAll = async () => {
  return Contacts.find();
};

const getContactById = async contactId => {
  return Contacts.findOne({ _id: contactId });
};

const addContact = async body => {
  return Contacts.create({ ...body });
};

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const removeContact = async contactId => {
  return Contacts.findOneAndDelete({ _id: contactId });
};

const updateFavorite = async (contactId, favorite) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, {favorite}, { new: true });
};

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};