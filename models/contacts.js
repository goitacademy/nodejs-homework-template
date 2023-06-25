const Contact = require("./contact.model");

const listContacts = async (filter = {}, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(filter).skip(skip).limit(limit).exec();
  return contacts;
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateContactFavorite = async (contactId, favorite) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return null;
  }
  contact.favorite = favorite;
  return await contact.save();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};