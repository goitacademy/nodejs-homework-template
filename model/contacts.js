const Contact = require("../services/schema");

const listContacts = async (query) => {
  const data = await Contact.find(query);
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findOne({ _id: contactId });
  return data;
};

const addContact = async (body) => {
  const data = Contact.create(body);
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove({ _id: contactId });
  return data;
};

const updateStatusContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
