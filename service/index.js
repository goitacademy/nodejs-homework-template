const Contact = require("../models/contactsSchema");
const User = require("../models/userSchema")

const listContacts = async (id) => {
  return Contact.find({ owner: id })
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner, });
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: fields },
  );
};

const updateUser = (id, fields) => {
    return User.findOneAndUpdate(
 { _id: id },
 { $set: fields },
);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateUser,
};