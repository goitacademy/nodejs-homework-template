const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json("Contact deleted");
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
