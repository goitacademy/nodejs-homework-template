const contact = require("../models/contact");

const listContacts = async () => {
  const result = await contact.find();
  return result;
};

const getContactById = async (contactId) => {
  const result = await contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
export {};
