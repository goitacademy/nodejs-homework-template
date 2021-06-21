/* eslint-disable no-useless-catch */
const { Contact } = require('../schemas/contactModel');
const { httpCode } = require('../helpers/constants');
const { CustomError } = require('../helpers/errors');

async function listContacts() {
  const result = await Contact.find({});
  return result;
}

async function getContactById(contactId) {
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new CustomError(httpCode.NOT_FOUND, 'Not found');
  }
  return result;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new CustomError(httpCode.NOT_FOUND, 'Not found');
  }
}

async function addContact(body) {
  const result = new Contact({ ...body });
  await result.save();
  return result;
}


const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { ...body },
    },
    { new: true }
  );
  if (!result) {
    throw new CustomError(httpCode.NOT_FOUND, 'Not found');
  }
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
