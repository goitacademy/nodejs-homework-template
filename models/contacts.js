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
    console.log(contactId);
    const result = await Contact.findOne({ _id: contactId });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
