const Contact = require("./schemas/contacts");

const listContacts = async () => {
  const contacts = Contact.find();
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndDelete(contactId);
  return deletedContact;
};

const addContact = async (contact) => {
  const newContact = Contact.create(contact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
