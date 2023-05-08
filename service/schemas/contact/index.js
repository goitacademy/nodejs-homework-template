const Contact = require("./contacts");

const getAllContacts = async (pageNumber, perPage, favorite) => {
  return Contact.find(favorite ? { favorite: JSON.parse(favorite) } : {})
    .skip(pageNumber > 0 ? (pageNumber - 1) * perPage : 0)
    .limit(perPage);
};
const getContactById =async (id) => {
  return Contact.findOne({ _id: id });
};

const addContact =async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact =async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact =async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};
const updateStatusContact =async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
