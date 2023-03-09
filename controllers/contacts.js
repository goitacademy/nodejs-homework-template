const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const data = req.body;

  const result = await Contact.create(data);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const upDateById = async (req, res, next) => {
  const data = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};
const upDateFavorite = async (req, res, next) => {
  const data = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  upDateById: ctrlWrapper(upDateById),
  upDateFavorite: ctrlWrapper(upDateFavorite),
};
