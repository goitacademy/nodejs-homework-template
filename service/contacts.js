const { Contact } = require("./schemas/contact.js");

const getAll = async () => Contact.find();

const getContact = async (contactId) => Contact.findById(contactId);

const createContact = async (body) => Contact.create(body);

const update = async (contactId, fields) =>
  Contact.findByIdAndUpdate(contactId, fields, { new: true });

const removeContact = async (contactId) => Contact.findByIdAndDelete(contactId);

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

module.exports = {
  getAll,
  getContact,
  createContact,
  update,
  removeContact,
  updateStatusContact,
};
