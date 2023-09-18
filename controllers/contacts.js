const { Contact } = require("../models/contacts");
const {
  addSchema,
  updateFavoriteSchema,
} = require("../utils/validation/contactValidationSchemas");

const { HttpError } = require("../utils");

const controllerWrapper = require("../utils/controllerWrapper");

const listContacts = controllerWrapper(async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
});

const getById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

const addContact = controllerWrapper(async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

const removeContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
});

const updateContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing fields");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

const updateStatusContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
