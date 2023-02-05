const Contact = require("../models/contact");
const createError = require("../helpers/createError");

const listContacts = async (userId) => {
  return await Contact.find({ owner: userId });
};

const getContactById = async (contactId, userId) => {
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  if (JSON.stringify(userId) !== JSON.stringify(contactById.owner)) {
    throw createError(401, "Not authorized");
  }
  return contactById;
};

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (contactId, userId) => {
  await getContactById(contactId, userId);
  return Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, userId, body) => {
  await getContactById(contactId, userId);
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, userId, body) => {
  await getContactById(contactId, userId);
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
