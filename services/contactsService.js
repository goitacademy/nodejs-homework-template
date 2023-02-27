const { Contacts } = require("../db");

const listContacts = async () => {
  return await Contacts.find({});
};

const getContactById = async (contactId) => {
  return await Contacts.find({ _id: contactId });
};

const addContact = async (body) => {
  return await Contacts.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndDelete({ _id: contactId });
};

const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
