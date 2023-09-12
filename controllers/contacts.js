const contacts = require("../models/contacts.js");
const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
  res.status(200);
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrWrapper(listContacts),
  getContactsById: ctrWrapper(getContactsById),
  addContact: ctrWrapper(addContact),
  updateById: ctrWrapper(updateById),
  removeContact: ctrWrapper(removeContact),
};
