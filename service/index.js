const Contact = require("../models/contact.model");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const removeContactById = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateContactById = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatusContactById = (id, favorite) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: favorite } },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  updateStatusContactById,
};
