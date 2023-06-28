const Contact = require("../service/schemas/user");

const getAllContacts = async (owner, favorite, page, limit) => {
  const skip = (page - 1) * limit;

  if (favorite && favorite.toLowerCase() === "true") {
    return Contact.find({ owner, favorite: true }).skip(skip).limit(limit);
  }

  if (favorite && favorite.toLowerCase() === "false") {
    return Contact.find({ owner, favorite: false }).skip(skip).limit(limit);
  }

  return Contact.find({ owner }).skip(skip).limit(limit);
};

const getContactById = (id, owner) => {
  return Contact.findOne({ _id: id, owner });
};

const createContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, owner, fields) => {
  return Contact.findByIdAndUpdate({ _id: id, owner }, fields);
};

const removeContact = (id, owner) => {
  return Contact.findByIdAndRemove({ _id: id, owner });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
