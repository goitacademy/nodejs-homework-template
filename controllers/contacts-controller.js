const { HttpError } = require('../helpers');
const { ContactModel } = require('../models');
const { userSchema } = require('../schemas');
const { ctrlWrapper } = require('../decorators');
const {
  findByIdAndUpdate,
  findByIdAndDelete,
  findByIdAndRemove,
} = require('../models/contact-model');

// Create - add
// Read   - getAll
// ReadOne - getById
// Update  - updateById
// Delete  - deleteById

const getAll = async (_, res) => {
  const result = await ContactModel.find({});
  if (!result) {
    throw HttpError(400, 'Unable to fetch data');
  }
  return res
    .status(200)
    .json({ code: 200, data: result, quantity: result.length });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findById(contactId);

  if (!result) {
    throw HttpError(404);
  }
  return res.status(200).json({ code: 200, data: result });
};

const add = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }

  const { name, phone } = req.body;
  if (!name || !phone) {
    throw HttpError(400, 'Name and Phone are required');
  }

  const result = await ContactModel.create({ ...req.body });
  if (!result) {
    throw HttpError(400, 'Unable to safe in DB');
  }
  return res.status(201).json({ code: 201, data: result });
};

const updateById = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }

  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw HttpError(404);
  }

  return res.status(200).json({ code: 200, data: result });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404);
  }
  return res.status(200).json({ code: 200, message: 'Contact deleted' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
