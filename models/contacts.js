const Contacts = require("../schemas/schema.js");

const listContacts = async () => {
  const results = await Contacts.find({});
  return results;
};

const getContactById = async (contactId) => {
  const results = await Contacts.findById(contactId);
  return results;
};

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
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
