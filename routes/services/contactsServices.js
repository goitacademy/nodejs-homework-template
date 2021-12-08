const { Contact } = require("../../db/contactsModel");
const createError = require("http-errors");

const getContacts = async (owner, skip, limit) => {
  const contacts = await Contact.find({ owner }, "", {
    skip,
    limit,
  });
  return contacts;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  await contact.save();
};

const deleteContact = async (contactId, owner) => {
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  return result;
};

const getById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  return contact;
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  owner
) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { name, email, phone, favorite } }
  );
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
};

const patchFavorite = async (contactId, favorite, owner) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } }
  );
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  return result;
};

module.exports = {
  getContacts,
  addContact,
  deleteContact,
  getById,
  updateContact,
  patchFavorite,
};
