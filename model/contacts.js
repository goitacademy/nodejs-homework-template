const Contact = require("./contact");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return await Contact.create(body);
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