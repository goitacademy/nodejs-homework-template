const { Contact } = require("../models/contacts");

const { handleHttpError, wrapController } = require("../utils");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "name email favorite");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id).exec();
  if (!result) {
    throw handleHttpError(404, "Not found ");
  }
  res.json(result);
};

const add = async (req, res) => {
  // console.log("user???", req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw handleHttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw handleHttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw handleHttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: wrapController(getAll),
  getById: wrapController(getById),
  add: wrapController(add),
  updateById: wrapController(updateById),
  updateFavorite: wrapController(updateFavorite),
  deleteById: wrapController(deleteById),
};
