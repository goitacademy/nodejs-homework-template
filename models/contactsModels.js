const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const arrayContact = await Contact.find();
  return arrayContact;
};

const getContactById = async (contactId) => {
  const fihdedEl = await Contact.findOne({ _id: contactId });
  return fihdedEl;
};

const removeContact = async (contactId) => {
  const fihdedEl = await Contact.findByIdAndDelete({ _id: contactId });
  return fihdedEl;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone },
    { new: true }
  );

  return result;
};

const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite: body.favorite },
    { new: true }
  );

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
