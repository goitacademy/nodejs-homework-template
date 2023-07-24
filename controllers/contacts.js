const Contacts = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contacts.find();
  res.json(result);
};
const getById = async (req, res) => {
  const id = req.params.id;
  const result = await Contacts.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await Contacts.create({ name, email, phone });
  res.status(201).json(result);
};
const deleteById = async (req, res) => {
  const id = req.params.id;
  const result = await Contacts.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const id = req.params.id;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateByFavorite = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateByFavorite: ctrlWrapper(updateByFavorite),
  updateById: ctrlWrapper(updateById),
};
