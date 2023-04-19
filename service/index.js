const Contact = require("./schemas/schemas");

const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  if (!contactId) {
    throw new Error("Not have ID");
  }
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, { name, email, phone }) => {
  if (!contactId) {
    return;
  }
  return Contact.findByIdAndUpdate({ _id: contactId }, { name, email, phone });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
