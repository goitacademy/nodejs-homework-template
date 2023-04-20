const Contact = require("./schemas/schemas");

const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  if (!contactId) {
    return;
  }
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  if (!contactId) {
    return;
  }
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || phone) {
    return;
  }
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, { name, email, phone }) => {
  if (!contactId) {
    return;
  }
  return Contact.findByIdAndUpdate({ _id: contactId }, { name, email, phone });
};
const updateStatus = async (contactId, { favorite }) => {
  if (!contactId) {
    return;
  }
  return Contact.findByIdAndUpdate({ _id: contactId }, { favorite });
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
};
