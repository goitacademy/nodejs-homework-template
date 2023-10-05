const { Contact } = require("../models/contact");

const {
  addSchema,
  updateFavoriteSchema,
} = require("../utils/validation/contactValidationSchemas");

const { HttpError } = require("../utils/helpers/HttpError");

const { ctrlWrapeer } = require("../utils/decorators/ctrlWrapper");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
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

  const result = await Contact.create(req.query);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);

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

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.query,
    { new: true }
  );
  res.status(200).json(result);
};

const updateFavorite = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapeer(listContacts),
  getContactById: ctrlWrapeer(getContactById),
  addContact: ctrlWrapeer(addContact),
  removeContact: ctrlWrapeer(removeContact),
  updateContact: ctrlWrapeer(updateContact),
  updateFavorite: ctrlWrapeer(updateFavorite),
};
