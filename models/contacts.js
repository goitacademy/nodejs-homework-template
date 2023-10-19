const { model } = require("mongoose");
const schema = require("../schemas/contactsSchema");
const Contact = model("contact", schema);

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
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
