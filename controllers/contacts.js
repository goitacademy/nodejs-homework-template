const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find().exec();
  console.log(result);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id).exec();

  if (!result) {
    throw HttpError(400, "Not found");
  }
  return res.status(200).json(result);
};
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json({
    message: "Delete success",
  });
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
