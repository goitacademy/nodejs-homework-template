const contactList = require("./schema/contact");

const getAllContacts = async () => {
  return contactList.find();
};

const getContactById = (contactId) => {
  return contactList.findOne({ _id: contactId });
};

const addContact = ({ name, email, phone }) => {
  return contactList.create({ name, email, phone });
};

const updateContact = (contactId, { name, email, phone }) => {
  return contactList.findByIdAndUpdate(
    { _id: contactId },
    { new: name, email, phone }
  );
};

const removeContact = (contactId) => {
  return contactList.findByIdAndRemove({ _id: contactId });
};

const updateStatusContact = (contactId, favorite) => {
  return contactList.findByIdAndUpdate({ _id: contactId }, favorite, {
    new: true,
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
