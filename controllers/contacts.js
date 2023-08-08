const { Contact } = require("../models/contact");
const { schemas } = require("../models/contact");
const { httpError, ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find({ owner });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json({ message: "Succesfully deleted" });
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { error } = schemas.updateStatusSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateStatus: ctrlWrapper(updateStatus),
};
