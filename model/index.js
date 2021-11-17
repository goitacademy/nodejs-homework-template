/* eslint-disable quotes */
/* eslint-disable semi */

const Contact = require("../schema/contactSchema.js");

const listContacts = async () => {
  try {
    const data = await Contact.find({});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const data = await Contact.findByIdAndDelete(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const data = await Contact.create(body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    const data = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
