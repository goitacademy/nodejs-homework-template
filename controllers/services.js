const Contact = require("../models/contacts");

const listContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const deleteContact = (id) => {
  return Contact.deleteOne({ _id: id });
};

const updateContact = async ({ id, toUpdate, upsert = false }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};
const updateStatusContact = async ({ id, favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite } },
    { new: true, runValidators: true, strict: "throw" }
  );
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
