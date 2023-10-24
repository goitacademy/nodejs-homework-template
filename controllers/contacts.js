const { Contact } = require("../models/Contact");

const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(result);
};

const removeByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByIdContact: ctrlWrapper(getByIdContact),
  addNewContact: ctrlWrapper(addNewContact),
  updateByIdContact: ctrlWrapper(updateByIdContact),
  removeByIdContact: ctrlWrapper(removeByIdContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
