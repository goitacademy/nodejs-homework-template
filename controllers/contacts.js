const Contact = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({owner}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const addNew = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
