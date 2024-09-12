const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");
const { schema } = require("../helpers/schemaValidate.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  // const { page = 1, limit = 20 } = req.query;
  // const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = schema.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schema.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schema.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
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
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
