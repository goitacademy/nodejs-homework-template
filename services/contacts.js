const Contact = require("./contactSchema");

const listContacts = async (isFavoritesRequest) => {
  if (isFavoritesRequest) {
    const favContacts = await Contact.find({ favorite: true });
    return favContacts;
  }
  const contacts = await Contact.find();
  return contacts;
};

async function getContactById(contactId) {
  return Contact.findOne({ _id: contactId });
}

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, contactChanges) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, contactChanges, {
    new: true,
  });
};

const updateFavoriteStatus = async (contactId, favStatus) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, favStatus, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
};
