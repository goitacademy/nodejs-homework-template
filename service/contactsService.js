const Contact = require("./schemas/contacts");

const getAllContacts = async ({ page = 1, limit = 20, favourite }) => {
  const options = {};

  if (favourite !== undefined) {
    options.favourite = favourite;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  return await Contact.find(options).skip(skip).limit(parseInt(limit));
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findOneAndDelete({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
