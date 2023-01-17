const Contact = require("./contactSchema");

const listContacts = async (searchFilters) => {
  const contacts = await Contact.find(searchFilters);
  return contacts;
};

async function getContactById(searchFilters) {
  return Contact.findOne(searchFilters);
}

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (searchFilters) => {
  return Contact.findByIdAndRemove(searchFilters);
};

const updateContact = async (searchFilters, contactChanges) => {
  return Contact.findOneAndUpdate(searchFilters, contactChanges, {
    new: true,
  });
};

const updateFavoriteStatus = async (searchFilters, favStatus) => {
  return Contact.findByIdAndUpdate(searchFilters, favStatus, {
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
