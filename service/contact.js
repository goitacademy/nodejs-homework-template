const Contact = require("./schemas/contact");


const createContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const removeContact = (id) => {
  return Contact.findOneAndDelete({ _id: id });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
};
