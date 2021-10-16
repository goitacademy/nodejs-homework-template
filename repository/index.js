const Contact = require("../model/contact");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
