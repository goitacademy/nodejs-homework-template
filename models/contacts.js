// const fs = require('fs/promises')
const Contact = require("../service/schemas/Contact");

const listContacts = async () => {
  try {
    const result = await Contact.find();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findOne({ _id: contactId });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete({ _id: contactId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, fields) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: fields },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
