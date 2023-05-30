const { HttpError } = require("../utils/HttpError");
const { request } = require("express");
const { Contact } = require("./Contact");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contactId;
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
