const { Customer } = require("../models/customer");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filterFavorite = { owner };
  if (favorite !== undefined) {
    filterFavorite.favorite = favorite;
  }
  const result = await Customer.find(filterFavorite, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { customerId } = req.params;
  // const result = await customer.findOne({_id:id});
  const result = await Customer.findById(customerId);
  if (!result) {
    throw HttpError(404, "Not found");
  } 
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Customer.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findByIdAndUpdate(customerId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findByIdAndUpdate(customerId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findByIdAndRemove(customerId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "customer deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
