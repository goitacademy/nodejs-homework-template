const Contact = require("../models/schema");

const listContacts = async () => {
  const data = await Contact.find();

  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findById(contactId);

  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove(contactId);
  if (data) {
    return true;
  } else {
    return false;
  }
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  return result;
};

const updateContact = async (req) => {
  const data = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
    new: true,
  });

  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
