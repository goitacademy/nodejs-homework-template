const Contact = require("../db/models/contactModel");

const getContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const postContact = async (body) => {
  return await new Contact(body).save();
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const changeContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

const toggleFavoriteContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  toggleFavoriteContact,
};
