const { Contact } = require("../schemas/contact");

const listContacts = async () => {
   return Contact.find();
}
const getContactById = async (contactId) => {
  return Contact.findById(contactId);
}
const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
}
const addContact = async (body) => {
  return Contact.create(body);
};
const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  };