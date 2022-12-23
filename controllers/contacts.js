const { Contact } = require("../models/contacts");
const { httpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-__v");
  res.status(200).json(result);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-__v");
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
