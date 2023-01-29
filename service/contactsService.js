const Contact = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findById(contactId);
  if (!data) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }
  return data;
};

const addContact = async (body) => {
  const data = await Contact.create(body);
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findById(contactId);
  if (!data) {
    throw new WrongParametersError(`Contact with ${contactId} don't found`);
  }
  await Contact.findByIdAndUpdate(contactId, body);
};

const patchContact = async (contactId, body) => {
  const data = await Contact.findById(contactId);
  if (!data) {
    throw new WrongParametersError(`Contact with ${contactId} don't found`);
  }
  await Contact.findByIdAndUpdate(contactId, body);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  patchContact,
};
