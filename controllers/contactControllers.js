const addSchema = require("../utils/validation/contactValidationSchemas");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const { ctrlWrapeer } = require("../utils/decorators/ctrlWrapper");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw new HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await contacts.addContact(req.query);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);

  if (!result) {
    throw new HttpError(404, "Not Found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await contacts.updateContact(req.params.contactId, req.query);
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapeer(listContacts),
  getContactById: ctrlWrapeer(getContactById),
  addContact: ctrlWrapeer(addContact),
  removeContact: ctrlWrapeer(removeContact),
  updateContact: ctrlWrapeer(updateContact),
};
