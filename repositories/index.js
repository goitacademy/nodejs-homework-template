const Contact = require("../model/contact");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
};

const getContactById = async (contactId) => {
  const results = await Contact.findOne({ _id: contactId });
  return results;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
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
