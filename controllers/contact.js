
const {Contact} = require('../models/contact')
const { HttpError, ctrl } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();

  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrl(getAll),
   getById: ctrl(getById),
   add: ctrl(add),
   remove: ctrl(remove),
   updateContact: ctrl(updateContact),
   updateFavorite: ctrl(updateFavorite),
};