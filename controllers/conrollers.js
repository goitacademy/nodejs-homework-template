const ctrlWrapper = require("../helpers");
const generateHTTPError = require("../../helpers");

const contacts = require("../models/contacts");

const listContacts = async (req, res, next) => {
  res = await contacts.listContacts();
  res.status(200).json(res.body);
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return generateHTTPError(404, "Not found");
  }
  res.status(200).json(contact);
};

const removeContact = async (req, res, next) => {
  await contacts.removeContact();
};

const addContact = async (req, res, next) => {
  await contacts.addContact();
};

const updateContact = async (req, res, next) => {
  await contacts.updateContact();
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
