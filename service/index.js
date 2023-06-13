const { Types } = require("mongoose");
const { Contact } = require("./schemas/contact.js");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null; 
  }
  return Contact.findById(contactId);
};

const createContact = async ({ name, email, phone}) => {
  return Contact.create({ name, email, phone });
};

const removeContact = async (contactId) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null; 
  }
  return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null; 
  }
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateFavorite = async (contactId, favorite) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null; 
  }
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );
};
module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateFavorite,
};
