const { ctrlWrapper, AppError } = require("../utils");

const { Contact } = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const {
  updateFavoriteSchema,
  isValidationBody,
} = require("../utils/validation");

const getContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  if (isValidationBody) {
    throw new AppError(400, "Missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json({ result });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  if (isValidationBody) {
    throw new AppError(400, "Missing fields");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result, message: "Contact updated" });
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw new AppError(400, "Missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result, message: "Contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  removeContact: ctrlWrapper(removeContact),
};
