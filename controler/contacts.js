const { HttpError, cntrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, { skip, limit });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  add: cntrlWrapper(add),
  updateById: cntrlWrapper(updateById),
  updateFavorite: cntrlWrapper(updateFavorite),
  deleteById: cntrlWrapper(deleteById),
};
