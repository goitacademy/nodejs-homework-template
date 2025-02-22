const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const answer = await Contact.find({}, "-createdAt -updatedAt");
  res.json(answer);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findById(id);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json(answer);
};

const add = async (req, res) => {
  const answer = await Contact.create(req.body);
  res.status(201).json(answer);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json(answer);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndRemove(id);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success!" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
