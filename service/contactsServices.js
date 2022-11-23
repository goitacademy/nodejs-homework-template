const Contact = require('./schemas/contactModel');

const getContacts = async () => {
  return await Contact.find();
};

const getContact = async contactId => {
  return await Contact.findById(contactId);
};

const addContact = async body => {
  return await Contact.create({ ...body });
};

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, { ...body }, { new: true });
};

const changeContactFavoriteStatus = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

module.exports = {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  changeContactFavoriteStatus,
};
