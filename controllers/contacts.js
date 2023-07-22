const { Contact, schemas } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
