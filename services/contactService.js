const Contact = require("./schemas/contactSchema");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateExistingContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
    runValidators: true,
  });
};

const deleteContact = (id) => {
  return Contact.deleteOne({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateExistingContact,
  deleteContact,
};
