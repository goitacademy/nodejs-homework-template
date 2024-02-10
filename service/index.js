const Contact = require("./schemas/contacts");

const getAllContacts = async () => Contact.find();

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
  const update = { favorite: favorite };
  return Contact.findByIdAndUpdate({ _id: contactId }, update, { new: true });
};

const deleteContact = async (contactId) => Contact.findByIdAndRemove(contactId);

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
