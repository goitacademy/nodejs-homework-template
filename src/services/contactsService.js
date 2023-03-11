const { Contacts } = require("../models");

const listContacts = async (owner) => {
  return await Contacts.find({ owner });
};

const getContactById = async (contactId, owner) => {
  return await Contacts.findById({ _id: contactId, owner });
};

const addContact = async (body) => {
  return await Contacts.create(body);
};

const removeContact = async (contactId, owner) => {
  return await Contacts.findByIdAndDelete({ _id: contactId, owner });
};

const updateContact = async (contactId, body, owner) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId, owner }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, body, owner) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId, owner }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
