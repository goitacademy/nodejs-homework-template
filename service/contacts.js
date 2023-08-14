const Contact = require("./schemas/contacts");

const getAllContacts = async () => Contact.find();

const getContactsByQbe = async (qbe) => Contact.find(qbe);

const getContactById = async (contactId) => Contact.findById(contactId);

const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = async (contactId, fields) => {
  return Contact.findByIdAndUpdate(contactId, fields, {
    new: true,
    strict: "throw",
    runValidators: true,
  });
};

const updateStatusContact = async (contactId, favorite) => {
  return Contact.findByIdAndUpdate(contactId, { favorite });
};

const deleteContact = async (contactId) => Contact.findByIdAndRemove(contactId);

module.exports = {
  getAllContacts,
  getContactsByQbe,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};