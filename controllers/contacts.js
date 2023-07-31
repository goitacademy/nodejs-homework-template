const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let filters = { owner };
  if (favorite) {
    filters = { ...filters, favorite };
  }

  const result = await Contact.find(filters, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  let filters = { owner };
  if (id) {
    filters = { ...filters, _id: id };
  }
  const result = await Contact.findById(
    filters,
    "-createdAt -updatedAt"
  ).populate("owner", "email subscription");
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  }).populate("owner", "email subscription");
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  }).populate("owner", "email subscription");
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id, owner }).populate(
    "owner",
    "email subscription"
  );
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json({
    message: "The contact was successfully deleted",
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
