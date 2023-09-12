const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const listContacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(listContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const singleContact = await Contact.findById(id);
  if (!singleContact) {
    throw HttpError(404, "Not found");
  }
  res.json(singleContact);
};

const addContact = async (req, res) => {
  const addedContact = await Contact.create(req.body);
  res.status(201).json(addedContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(removeContact),
};
