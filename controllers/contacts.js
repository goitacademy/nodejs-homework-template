const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 20, favorite, name, email, phone } = req.query;

  const filter = { owner: userId };
  if (favorite) {
    filter.favorite = favorite;
  }
  if (name) {
    filter.name = new RegExp(name, "i");
  }
  if (email) {
    filter.email = new RegExp(email, "i");
  }
  if (phone) {
    filter.phone = new RegExp(phone, "i");
  }
  const skip = (page - 1) * limit;

  const result = await Contact.find(filter, "", { skip, limit: Number(limit) });
  res.status(200).json({ result });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findOne({ _id: id, owner: userId });
  if (!result) {
    throw HttpError(404, "Not found");
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
  const { _id: userId } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner: userId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const { favorite } = req.body;
  const { _id: userId } = req.user;

  if (!favorite) {
    res.status(400).json({ message: '"message": "missing fields"' });
  }
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
