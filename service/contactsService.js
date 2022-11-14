const Contact = require("../models/contact.model");

const getAllContacts = async ({ owner, limit, page, favorite }) => {
  console.log(owner);
  console.log(":", limit, page);
  console.log("favorite:", favorite);
  const skip = (page - 1) * limit;
  return Contact.find({ owner, favorite }).skip(skip).limit(limit);
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }, userId) => {
  console.log({ name, email, phone, favorite, userId });
  return Contact.create({ name, email, phone, favorite, owner: userId });
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
