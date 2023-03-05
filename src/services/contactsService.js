const { Contacts } = require("../db");

const listContacts = async () => {
  return await Contacts.find({});
};

const getContactById = async (contactId) => {
  return await Contacts.findById(contactId);
};

const addContact = async (body) => {
  if (!body.favorite) body.favorite = false;
  return await Contacts.create(body);
};

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, { favorite: body.favorite }, {
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
