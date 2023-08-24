const Contact = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const schemas = require("../schemas/contacts");

const listContacts = async (req, res) => {
   const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}

const removeContact = async (req, res) => {
const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.status(200).json({ message: "contact has been successfully deleted" });
};

const addContact = async (req, res) => {
const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = schemas.updateSchema.validate(req.body);
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
}
