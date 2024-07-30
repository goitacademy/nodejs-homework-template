const Contact = require("../models/contact");
const fetchContacts = (userId) => {
  return Contact.find({ owner: userId });
};

const fetchContact = (userId, id) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const insertContact = (userId, { name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite, owner: userId });
};

const updadeContact = async (userId, { id, toUpdate, upsert = false }) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};

const updateStatusContact = async (userId, { id, favorite }) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
};

const removeContact = (userId, id) =>
  Contact.findOneAndDelete({ _id: id, owner: userId });

module.exports = {
  fetchContacts,
  fetchContact,
  insertContact,
  updadeContact,
  removeContact,
  updateStatusContact,
};
