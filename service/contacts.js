const { Contact } = require("./schemas/contact.js");

const getAllContacts = async (body) => Contact.find(body);

const getContactById = async (contactId) => Contact.findById(contactId);

const createContact = async (body) => Contact.create(body);

const updateContact = async (contactId, fields) =>
  Contact.findByIdAndUpdate(contactId, fields, { new: true });

const removeContact = async (contactId) => Contact.findByIdAndDelete(contactId);

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
