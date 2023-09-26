const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

// Get
const getAll = async (req, res) => {
  const result = await Contact.find();

  res.status(200).json(result);
};

// Get by Id
const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await contacts.getContactById(id);
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

// Post
const add = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// Delete
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

// Put
const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

// Patch
const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
