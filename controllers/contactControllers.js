const { Contact } = require("../models/contacts");

const { handleHttpError, wrapController } = require("../utils");

const getAll = async (req, res) => {
  const result = await Contact.find().exec();
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
  const result = await Contact.create(req.body);
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
  console.log(id);
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
