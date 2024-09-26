const { Contact } = require("./schemas/contact");

const getAllContacts = () => Contact.find();

const findById = (contactId) => Contact.findOne({ _id: contactId });

const addNewContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = (contactId, { name, email, phone, favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone, favorite },
    { new: true }
  );
};

const updateStatusContact = (contactId, { favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = {
  getAllContacts,
  findById,
  addNewContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
