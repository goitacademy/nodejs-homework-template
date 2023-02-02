const Contact = require("../models/contact");
const createError = require("../helpers/createError");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  return contactById;
};

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (contactId) => {
  await getContactById(contactId);
  return Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  await getContactById(contactId);
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  await getContactById(contactId);
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
