const Contact = require("./Contact");

const listContacts = async (page = 1, limit = 20, favorite) => {
  const skip = (page - 1) * limit;
  const query = favorite !== undefined ? { favorite } : {};

  return await Contact.find(query).skip(skip).limit(limit).exec();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contact({ name, email, phone });
  return await newContact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
